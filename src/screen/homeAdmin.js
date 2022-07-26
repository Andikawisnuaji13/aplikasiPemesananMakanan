import React ,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import Axios from 'axios';


const Item = ({id, nama, jumlah, tanggal, onPress, onDelete}) => {
    return(
    <View style={gaya.itemContainer}>
        <TouchableOpacity onPress={onPress} style={{flex:1,}}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <Text>Nomor Penjualan: {id}</Text>
        <TouchableOpacity onPress={onDelete}>
        <Text style={gaya.delete}>X</Text>
        </TouchableOpacity>  
        </View>
        <Text style={gaya.deskripsinama}>{nama} </Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={gaya.deskripsijumlah}>Jumlah Makanan: {jumlah}</Text>
        <Text style={gaya.deskripsitanggal}>{tanggal}</Text>
        </View>
        </TouchableOpacity>
    </View>
    );
}
const HomeAdmin = (props) => {
    const [nama, setNama] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [penjualan, setPenjualan] = useState([]);
    const [button, setButton] = useState("Tambah");
    const [selectedPenjualan, setSelectedPenjualan] = useState ({});


    useEffect(() =>{
        getData();
    }, [])

    const Submit = () => {
        const data ={
            nama,
            jumlah,
            tanggal,
        }

        if (button === "Tambah"){
            Axios.post('http://192.168.43.77:3004/penjualan', data)
            .then(res => {
                console.log('res: ', res);
                setNama("");
                setJumlah("");
                setTanggal("");
                getData();
            })
        } else if(button === "Update"){
            Axios.put(`http://192.168.43.77:3004/penjualan/${selectedPenjualan.id}`, data)
            .then(res =>{
                console.log('res update:', res);
                setNama("");
                setJumlah("");
                setTanggal("");
                getData();
                setButton("Tambah");
            })
        }
    }

    const getData = () => {
        Axios.get('http://192.168.43.77:3004/penjualan')
        .then(res =>{
            console.log('res getdata', res);
            setPenjualan(res.data);
        })
    }

    const selectItem = (item) => {
        console.log('Selected Item: ', item)
        setSelectedPenjualan(item);
        setNama(item.nama);
        setJumlah(item.jumlah);
        setTanggal(item.tanggal);
        setButton("Update");

    }

    const deleteItem = (item) => {
        console.log(item);
        Axios.delete(`http://192.168.43.77:3004/penjualan/${item.id}`)
        .then(res =>{
            console.log('res:', res);
            getData();
        })
    }
    return(
        <View>
            <View style={{paddingVertical: 15, justifyContent: 'space-between', alignItems: 'center', backgroundColor:'#2196f3', flexDirection:'row'}}>
            <Text style={{color:'#ffffff', fontSize: 20, fontWeight:'bold', marginLeft: 20}}>Daftar Penjualan Makanan</Text>
            <TouchableOpacity onPress={() => {props.navigation.navigate('Menu')}} style={{flex: 1}}>
                <Text style={{textAlign:'right', marginRight: 20, color:'#ffffff'}}>Menu</Text>
            </TouchableOpacity>
            </View>
        <ScrollView style={gaya.container}>
            {penjualan.map(penjualan => {
                return (
                <Item 
                    key={penjualan.id}
                    id={penjualan.id} 
                    nama={penjualan.nama} 
                    jumlah={penjualan.jumlah} 
                    tanggal={penjualan.tanggal} 
                    onPress={() => selectItem(penjualan)}
                    onDelete={() => Alert.alert(
                        'Peringatan', 
                        'Apakah anda yakin menghapus data ini?', 
                        [
                            {text: 'Tidak', onPress:()=> console.log('button tidak')}, 
                            {text: 'Ya', onPress:()=> deleteItem(penjualan)}
                        ]
                        )} />)
            })}
            <TextInput placeholder='nama makanan' style={gaya.input} value={nama} onChangeText={(value) => setNama(value)}/>
            <TextInput placeholder=' jumlah' style={gaya.input} value={jumlah} onChangeText={(value) => setJumlah(value)}/>
            <TextInput placeholder=' tanggal' style={gaya.input} value={tanggal} onChangeText={(value) => setTanggal(value)}/>
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
export default HomeAdmin;