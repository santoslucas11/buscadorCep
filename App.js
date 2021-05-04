import api from './src/services/api';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import { color } from 'react-native-reanimated';

export default function App() {
  const[cep, setCep] = useState('');
  const inputRef = useRef(null);
  const[cepUser, setCepUser] = useState(null);

  function limpar(){
    setCep('');
    inputRef.current.focus();
  }

  async function buscar(){
   if(cep == ''){
     alert("Digite um cep válido");
     setCep('');
     return;
   } 

   try{
     const response = await api.get(`/${cep}/json`);
     console.log(response.data);
     setCepUser(response.data) 
     Keyboard.dismiss();
   }catch(error){
     console.log("ERROR: " + error);
   }

  }

  return (
    <SafeAreaView  style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: 209750-071" 
          value={cep} 
          onChangeText={(texto) => setCep(texto)}
          keyboardType = 'numeric'
          ref={inputRef}/>
      </View>
      
      <View style={styles.areaBtn}>

        <TouchableOpacity style={[styles.btn, {backgroundColor: '#2196f3'}]} onPress={buscar}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn,  {backgroundColor: '#e91e63'}]} onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>

      </View>

      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP:{cepUser.cep} </Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
    }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: "#FFF" ,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5 ,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  }, 
  btn:{
    height: 50,
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5
  },
  botaoText:{
    fontSize: 20,
    color:'#fff'
  },
  resultado:{
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  itemText:{
    fontSize: 22
  }
});
