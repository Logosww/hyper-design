import { useClipboard } from "@vueuse/core";
import { HMessage } from 'hyperui';
import { ref } from "vue";

const copyContent = ref('');
const { copy, isSupported } = useClipboard({
    source: copyContent,
    read: false
});

export const useCopy = async (content: string) => {
    copyContent.value = content;
    try {
        await copy();
        HMessage.success('复制成功');
    } catch(e: any) {
        HMessage.error(e.message);
    }
};