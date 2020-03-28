import React, { useState ,useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'

import api from '../../services/api'

import styles from './styles'

import logoImg from './assets/logo.png'
import { unstable_batchedUpdates } from 'react-dom';

export default function Incidents(){

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }
    
    async function loadIncidents() {

        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params :{ page }
        });
        setIncidents([
            ... incidents, ... response.data
        ]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(()=> {
        loadIncidents()
    } ,[]);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    total de <Text style={styles.headerTextBold}>{total}</Text> casos
                </Text>
            </View>
            <View>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.description}>
                    Escolha um dos casos a baixo e salve o dia!
                </Text>
            </View>
            <FlatList 
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                style={styles.incidentList}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident })=> (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'})
                            .format(incident.value)}
                            </Text>

                        <TouchableOpacity 
                            style={styles.detailButton}
                            onPress={() =>navigateToDetail(incident)}
                        >
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}