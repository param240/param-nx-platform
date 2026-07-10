import { Host, Text, type TextProps } from "@expo/ui";

const CoreText = (props: TextProps) => {
    return (
        <Host>
            <Text {...props} />
        </Host>
    )
}

export default CoreText;