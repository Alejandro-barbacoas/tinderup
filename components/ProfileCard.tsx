import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Profile } from '../app/data/profiles';

const { width, height } = Dimensions.get('window');

interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onPass: () => void;
}

export default function ProfileCard({ profile, onLike, onPass }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      {/* Imagen grande */}
      <Image 
        source={{ uri: profile.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* Sección de botones + info */}
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[styles.button, styles.passButton]}
          onPress={onPass}
        >
          <Text style={styles.buttonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.infoCenter}>
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          <Text style={styles.gender}>{profile.gender === 'F' ? 'Mujer' : 'Hombre'}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.likeButton]}
          onPress={onLike}
        >
          <Text style={styles.buttonText}>♥</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bio e intereses */}
      <View style={styles.infoContainer}>
        <Text style={styles.bio}>{profile.bio}</Text>
        
        <View style={styles.interestsContainer}>
          {profile.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 0,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 2,
    borderBottomColor: '#00ffff',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  passButton: {
    backgroundColor: '#1a1a1a',
    borderColor: '#ff0055',
    shadowColor: '#ff0055',
  },
  likeButton: {
    backgroundColor: '#1a1a1a',
    borderColor: '#00ff88',
    shadowColor: '#00ff88',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  infoCenter: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gender: {
    fontSize: 14,
    color: '#00ffff',
    marginTop: 2,
  },
  infoContainer: {
    padding: 15,
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  bio: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#00ffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 0,
  },
  interestText: {
    color: '#00ffff',
    fontSize: 13,
    fontWeight: '500',
  },
});