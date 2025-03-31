# Bubble Sort - Visualisierung

für die gute wif note

## Java-Äquivalent des Algorithmus

```java
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {29, 10, 14, 37, 13};
        bubbleSort(arr);
        for (int n : arr) {
            System.out.print(n + " ");
        }
    }

    static void bubbleSort(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            for (int j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }
}
```
