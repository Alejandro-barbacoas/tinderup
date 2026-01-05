import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ProfileCard from '../components/ProfileCard';
import { profiles } from '../data/profiles';

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [passCount, setPassCount] = useState(0);
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const currentProfile = profiles[currentIndex];

  // Función para manejar like
  const handleLike = () => {
    setLikeCount(prev => prev + 1);
    nextProfile();
    Alert.alert('LIKE!', `Te gustó ${currentProfile.name}`);
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
      Alert.alert('Viste todo lo veable');
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
        <Text style={styles.endText}>¡Ya viste todos los perfiles! 🎉</Text>
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
          <Text style={styles.statLabel}>Pasa</Text>
        </View>
      </View>

      {/* Tarjeta con gesture */}
      <View style={styles.cardContainer}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardWrapper, animatedStyle]}>
            <ProfileCard profile={currentProfile} />
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.passButton]}
          onPress={handlePass}
        >
          <Text style={styles.buttonText}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.likeButton]}
          onPress={handleLike}
        >
          <Text style={styles.buttonText}>♥</Text>
        </TouchableOpacity>
      </View>

      {/* Contador de perfiles */}
      <Text style={styles.counter}>
        {currentIndex + 1} / {profiles.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statContainer: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 30,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passButton: {
    backgroundColor: '#FF6B6B',
  },
  likeButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  endText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 100,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});