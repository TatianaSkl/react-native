import { StyleSheet, Text, View } from 'react-native';

export const PostsSceen = () => {
  return (
    <View style={styles.container}>
      <Text>PostsSceen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
});
