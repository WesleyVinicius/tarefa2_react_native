import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

function GiveClasses() {
  const { goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode='contain' 
        source={giveClassesBackgroundImage} 
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Coach?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como coach na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;