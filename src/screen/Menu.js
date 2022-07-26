import React ,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Item = ({nama, harga, modal, onPress, onDelete}) => {
    return(
    <View style={gaya.itemContainer}>
        <TouchableOpacity onPress={onPress} style={{flex:1,}}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <Text style={gaya.deskripsinama}>{nama} </Text>
        <TouchableOpacity onPress={onDelete}>
        <Text style={gaya.delete}>X</Text>
        </TouchableOpacity>  
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={gaya.deskripsijumlah}>Harga: {harga}</Text>
        <Text style={gaya.deskripsitanggal}>Modal: {modal}</Text>
        </View>
        </TouchableOpacity>
    </View>
    );
}
const Menu = (props) => {
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    const [modal, setModal] = useState("");
    const [menu, setMenu] = useState([]);
    const [button, setButton] = useState("Tambah");
    const [selectedMenu, setSelectedMenu] = useState ({});


    useEffect(() =>{
        getData();
    }, [])

    const Submit = () => {
        const data ={
            nama,
            harga,
            modal,
        }

        if (button === "Tambah"){
            Axios.post('http://192.168.43.77:3000/menu', data)
            .then(res => {
                console.log('res: ', res);
                setNama("");
                setHarga("");
                setModal("");
                getData();
            })
        } else if(button === "Update"){
            Axios.put(`http://192.168.43.77:3000/menu/${selectedMenu.id}`, data)
            .then(res =>{
                console.log('res update:', res);
                setNama("");
                setHarga("");
                setModal("");
                getData();
                setButton("Tambah");
            })
        }
    }

    const getData = () => {
        Axios.get('http://192.168.43.77:3000/menu')
        .then(res =>{
            console.log('res getdata', res);
            setMenu(res.data);
        })
    }

    const selectItem = (item) => {
        console.log('Selected Item: ', item)
        setSelectedMenu(item);
        setNama(item.nama);
        setHarga(item.harga);
        setModal(item.modal);
        setButton("Update");

    }

    const deleteItem = (item) => {
        console.log(item);
        Axios.delete(`http://192.168.43.77:3000/menu/${item.id}`)
        .then(res =>{
            console.log('res:', res);
            getData();
        })
    }
    return(
        <View>
            <View style={{paddingVertical: 15, justifyContent: 'space-between', alignItems: 'center', backgroundColor:'#2196f3', flexDirection:'row'}}>
            <Text style={{color:'#ffffff', fontSize: 20, fontWeight:'bold', marginLeft: 20}}>Daftar menu Makanan</Text>
            
            </View>
        <ScrollView style={gaya.container}>
            {menu.map(menu => {
                return (
                <Item 
                    key={menu.id}
                    id={menu.id} 
                    nama={menu.nama} 
                    harga={menu.harga} 
                    modal={menu.modal} 
                    onPress={() => selectItem(menu)}
                    onDelete={() => Alert.alert(
                        'Peringatan', 
                        'Apakah anda yakin menghapus data ini?', 
                        [
                            {text: 'Tidak', onPress:()=> console.log('button tidak')}, 
                            {text: 'Ya', onPress:()=> deleteItem(menu)}
                        ]
                        )} />)
            })}
            <TextInput placeholder='nama makanan' style={gaya.input} value={nama} onChangeText={(value) => setNama(value)}/>
            <TextInput placeholder=' harga' style={gaya.input} value={harga} onChangeText={(value) => setHarga(value)}/>
            <TextInput placeholder=' modal' style={gaya.input} value={modal} onChangeText={(value) => setModal(value)}/>
            <Button title={button} onPress={Submit}/>
            <View style={gaya.line}></View>
        </ScrollView>
        </View>
    );
}


const gaya = StyleSheet.create({
    container:{
        padding: 20,
    },
    TextJudul:{
        textAlign:'center',
        marginBottom: 20
    },
    line:{
        height: 2,
        backgroundColor:'black',
        marginVertical:20,
        marginBottom: 200
    },
    input:{
        borderWidth: 1,
        marginBottom: 12,
        borderRadius: 10,
        paddingHorizontal: 18
    },
    avatar:{
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    itemContainer:{
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical:10,
        backgroundColor:'#eeeeee',
        borderRadius:10
    },
    deskripsi:{
        marginLeft: 18,
    },
    deskripsinama:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    deskripsijumlah:{
        fontSize: 16
    },
    deskripsitanggal:{
        fontSize: 12,
        marginTop: 8
    },
})
export default Menu;