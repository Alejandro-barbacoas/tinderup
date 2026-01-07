import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Profile } from '../data/profiles';

interface CreateProfileProps {
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}

export default function CreateProfile({ onSave, onCancel }: CreateProfileProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('F');

  // Tomar foto con cámara
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permission.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Seleccionar de galería
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permission.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Guardar perfil
  const handleSave = () => {
    if (!photo || !name || !age || !bio) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const newProfile: Profile = {
      id: Date.now(),
      name,
      age: parseInt(age),
      gender,
      bio,
      image: photo,
      interests: [],
    };

    onSave(newProfile);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Crear Perfil</Text>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Foto */}
        {photo ? (
          <Image source={{ uri: photo }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Sin foto</Text>
          </View>
        )}

        {/* Botones de foto */}
        <View style={styles.photoButtons}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Bio"
          placeholderTextColor="#666"
          multiline
          value={bio}
          onChangeText={setBio}
        />

        {/* Género */}
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'F' && styles.genderActive]}
            onPress={() => setGender('F')}
          >
            <Text style={[styles.genderText, gender === 'F' && styles.genderActiveText]}>
              Mujer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'M' && styles.genderActive]}
            onPress={() => setGender('M')}
          >
            <Text style={[styles.genderText, gender === 'M' && styles.genderActiveText]}>
              Hombre
            </Text>
          </TouchableOpacity>
        </View>

        {/* Guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff1493',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#ff1493',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ff1493',
    fontSize: 20,
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    height: 300,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff1493',
  },
  placeholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff1493',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff1493',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ff1493',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff1493',
    padding: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ff1493',
    padding: 15,
    alignItems: 'center',
  },
  genderActive: {
    backgroundColor: '#ff1493',
  },
  genderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderActiveText: {
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#ff1493',
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});