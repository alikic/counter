import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';

const App = () => {
  const [counter, setCounter] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [direction, setDirection] = useState('decrement');

  useEffect(() => {
    if (counter <= 0) {
      setGameOver(true);
      setGameOverMessage('You Starved');
      return;
    } else if (counter >= 10) {
      setGameOver(true);
      setGameOverMessage('You got Heart Attack');
      return;
    }

    const interval = setTimeout(() => {
      setCounter(prevCounter => prevCounter + (direction === 'increment' ? 1 : -1));
    }, 1000);

    return () => clearTimeout(interval);
  }, [counter, direction]);

  const resetGame = () => {
    setCounter(5);
    setDirection('decrement');
    setGameOver(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Game Over Overlay */}
      <Modal visible={gameOver} transparent={true} animationType="fade">
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>{gameOverMessage}</Text>
          <TouchableHighlight style={styles.repentButton} onPress={resetGame}>
            <Text style={styles.repentButtonText}>Repent</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food Sins</Text>
      </View>
      
      {/* Counter Display */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{counter}</Text>
      </View>
      
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => !gameOver && setDirection('increment')} disabled={gameOver}>
          <Text style={styles.buttonText}>More Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => !gameOver && setDirection('decrement')} disabled={gameOver}>
          <Text style={styles.buttonText}>Less Food</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 48,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  gameOverOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  repentButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  repentButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default App;
