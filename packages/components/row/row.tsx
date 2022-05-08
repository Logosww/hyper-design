import { computed, defineComponent, provide } from "vue";
import { rowContextKey } from '@hyper/tokens';
import { buildProps } from "@hyper/utils";

import type { CSSProperties, ExtractPropTypes } from "vue";

const  JUSTIFY_MAP = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'],
    ALIGN_MAP = ['top', 'center', 'bottom'];

export const rowProps = buildProps({
    tag: {
        type: String,
        default: 'div'
    },
    gutter: {
        type: Number,
        default: 0
    },
    justify: {
        type: String,
        values: JUSTIFY_MAP,
        default: 'start'
    },
    align: {
        type: String,
        values: ALIGN_MAP,
        default: 'top'
    }
} as const);

export type RowProps = ExtractPropTypes<typeof rowProps>;

const Row = defineComponent({
    name: 'HRow',
    props: rowProps,

    setup(props, { slots }) {
        const gutter = computed(() => props.gutter);
        provide(rowContextKey, { gutter });

        const style = computed(() => {
            const styles: CSSProperties = {
                marginLeft: '',
                marginRight: ''
            };
            if(props.gutter) styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
            
            return styles;
        });

        return () => (
            <props.tag
              class={ [ 'hp-row', `justify-${props.justify}`, `align-${props.align}`] }
              style={ style.value }
            >
                { slots.default?.() }
            </props.tag>
        )
    }
});

export default Row;

export type RowInstance = InstanceType<typeof Row>;