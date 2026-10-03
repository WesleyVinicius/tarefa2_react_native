import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import CoachItem, { Coach } from '../../components/CoachItem';
import PageHeader from '../../components/PageHeader';

import styles from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedCoaches = JSON.parse(response);

        setFavorites(favoritedCoaches);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus coaches favoritos" />

      <ScrollView
        style={styles.coachList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((coach: Coach) => {
          return (
            <CoachItem 
              key={coach.id}
              coach={coach}
              favorited
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;