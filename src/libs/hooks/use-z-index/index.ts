import { ref, computed } from 'vue';
// import { useGlobalConfig } from '../use-global-config';

const zIndex = ref(0);

export const useZIndex = () => {
    // const initialZIndex = useGlobalConfig('zIndex', 2000);
    const initialZIndex = 2000;
    const currentZIndex = computed((): number => initialZIndex + zIndex.value);

    const nextZIndex = (): number => {
        zIndex.value++;
        // console.log('update', currentZIndex.value);
        return currentZIndex.value;
    };

    return {
        initialZIndex,
        currentZIndex,
        nextZIndex
    };
}