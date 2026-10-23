import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home({ habits }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <LinearGradient colors={['#7c3aed', '#6366f1']} style={{ height: 240 }}>
        <Text allowFontScaling={false} style={{ color: '#ffffff', fontSize: 32 }}>Elevate your habits seamlessly</Text>
        <Text>Lorem ipsum dolor sit amet</Text>
      </LinearGradient>
      <ScrollView>
        {habits.map((h) => (
          <TouchableOpacity key={h.id} style={{ height: 44 }}>
            <Image source={{ uri: h.icon }} />
            <Text maxFontSizeMultiplier={1}>{h.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Pressable onPress={() => {}}>
        <Ionicons name="add" size={20} />
      </Pressable>
    </SafeAreaView>
  );
}
