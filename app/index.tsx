import { View, StyleSheet, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import { useState } from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ProfileCard from '../components/ProfileCard';
import CreateProfile from './screens/CreateProfile';
import { profiles as initialProfiles, Profile } from './data/profiles';

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [passCount, setPassCount] = useState(0);
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const currentProfile = profiles[currentIndex];

  // Función para agregar nuevo perfil
  const addNewProfile = (newProfile: Profile) => {
    setProfiles(prev => [...prev, newProfile]);
    setShowCreateProfile(false);
    Alert.alert('Perfil creado', 'Tu perfil se agregó correctamente');
  };

  // Función para manejar like
  const handleLike = () => {
    setLikeCount(prev => prev + 1);
    nextProfile();
    Alert.alert('LIKE', `Te gustó ${currentProfile.name}`);
  };

  // Función para manejar pass
  const handlePass = () => {
    setPassCount(prev => prev + 1);
    nextProfile();
  };

  // Siguiente perfil
  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
      translateX.value = 0;
      translateY.value = 0;
      rotate.value = 0;
    } else {
      Alert.alert('Fin', 'Ya viste todos los perfiles');
    }
  };

  // Gestos de swipe
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = event.translationX / 20;
    })
    .onEnd((event) => {
      const shouldDismiss = Math.abs(event.translationX) > 150;
      
      if (shouldDismiss) {
        const direction = event.translationX > 0 ? 1 : -1;
        translateX.value = withSpring(direction * 500);
        
        if (direction === 1) {
          runOnJS(handleLike)();
        } else {
          runOnJS(handlePass)();
        }
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  if (currentIndex >= profiles.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.endText}>Ya viste todos los perfiles</Text>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => setCurrentIndex(0)}
        >
          <Text style={styles.resetButtonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header con stats */}
      <View style={styles.header}>
        <View style={styles.statContainer}>
          <Text style={styles.statNumber}>{likeCount}</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <Text style={styles.title}>TinderUp</Text>
        <View style={styles.statContainer}>
          <Text style={styles.statNumber}>{passCount}</Text>
          <Text style={styles.statLabel}>Pass</Text>
        </View>
      </View>

      {/* Botón para crear perfil */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => setShowCreateProfile(true)}
      >
        <Text style={styles.createButtonText}>+ Crear Perfil</Text>
      </TouchableOpacity>

      {/* Tarjeta con gesture */}
      <View style={styles.cardContainer}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardWrapper, animatedStyle]}>
            <ProfileCard 
              profile={currentProfile}
              onLike={handleLike}
              onPass={handlePass}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Contador de perfiles */}
      <Text style={styles.counter}>
        {currentIndex + 1} / {profiles.length}
      </Text>

      {/* Modal de crear perfil */}
      <Modal
        visible={showCreateProfile}
        animationType="slide"
        onRequestClose={() => setShowCreateProfile(false)}
      >
        <CreateProfile
          onSave={addNewProfile}
          onCancel={() => setShowCreateProfile(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 2,
    borderBottomColor: '#ff1493',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff1493',
    textShadowColor: '#ff1493',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statContainer: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ff1493',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  cardWrapper: {
    position: 'absolute',
  },
  counter: {
    fontSize: 16,
    color: '#ff1493',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff1493',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 10,
  },
  createButtonText: {
    color: '#ff1493',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  endText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 100,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff1493',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 0,
    marginTop: 20,
  },
  resetButtonText: {
    color: '#ff1493',
    fontSize: 18,
    fontWeight: 'bold',
  },
});