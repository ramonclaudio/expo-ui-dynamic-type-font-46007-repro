import { Form, Host, Section, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function App() {
  if (Platform.OS !== 'ios') {
    return (
      <Host style={{ flex: 1 }}>
        <Form>
          <Section title="iOS only">
            <Text>
              This repro tests Dynamic Type for the `font` modifier in @expo/ui/swift-ui. Run on
              iOS.
            </Text>
          </Section>
        </Form>
      </Host>
    );
  }

  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <SystemTextStyles />
        <CustomFontRelativeToStyle />
        <FixedSizeBaseline />
        <WeightOnCustomFamily />
        <StatusBarSection />
      </Form>
    </Host>
  );
}

function SystemTextStyles() {
  return (
    <Section title="1. System text styles (scale with Dynamic Type)">
      <VStack alignment="leading" spacing={6}>
        <Text modifiers={[font({ textStyle: 'largeTitle', weight: 'bold' })]}>largeTitle</Text>
        <Text modifiers={[font({ textStyle: 'title' })]}>title</Text>
        <Text modifiers={[font({ textStyle: 'title2' })]}>title2</Text>
        <Text modifiers={[font({ textStyle: 'title3' })]}>title3</Text>
        <Text modifiers={[font({ textStyle: 'headline' })]}>headline</Text>
        <Text modifiers={[font({ textStyle: 'subheadline' })]}>subheadline</Text>
        <Text modifiers={[font({ textStyle: 'body' })]}>body</Text>
        <Text modifiers={[font({ textStyle: 'callout' })]}>callout</Text>
        <Text modifiers={[font({ textStyle: 'footnote' })]}>footnote</Text>
        <Text modifiers={[font({ textStyle: 'caption' })]}>caption</Text>
        <Text modifiers={[font({ textStyle: 'caption2' })]}>caption2</Text>
      </VStack>
    </Section>
  );
}

function CustomFontRelativeToStyle() {
  return (
    <Section title="2. Custom font + textStyle (scales relative to the style)">
      <VStack alignment="leading" spacing={6}>
        <Text modifiers={[font({ family: 'Helvetica', size: 28, textStyle: 'largeTitle' })]}>
          Helvetica 28pt relativeTo: largeTitle
        </Text>
        <Text modifiers={[font({ family: 'Helvetica', size: 17, textStyle: 'body' })]}>
          Helvetica 17pt relativeTo: body
        </Text>
        <Text modifiers={[font({ family: 'Helvetica', size: 12, textStyle: 'caption' })]}>
          Helvetica 12pt relativeTo: caption
        </Text>
      </VStack>
    </Section>
  );
}

function FixedSizeBaseline() {
  return (
    <Section title="3. Fixed-size baseline (does NOT scale)">
      <VStack alignment="leading" spacing={6}>
        <Text modifiers={[font({ size: 28, weight: 'bold' })]}>28pt fixed</Text>
        <Text modifiers={[font({ size: 17 })]}>17pt fixed</Text>
        <Text modifiers={[font({ family: 'Helvetica', size: 28 })]}>Helvetica 28pt fixed</Text>
      </VStack>
    </Section>
  );
}

function WeightOnCustomFamily() {
  return (
    <Section title="4. Weight on custom family (co-benefit fix)">
      <Text modifiers={[foregroundStyle('secondaryLabel')]}>
        Pre-patch, `Font.custom(_:size:)` dropped `weight` silently. The same call now applies
        bold.
      </Text>
      <VStack alignment="leading" spacing={6}>
        <Text modifiers={[font({ family: 'Helvetica', size: 17 })]}>Helvetica 17pt regular</Text>
        <Text modifiers={[font({ family: 'Helvetica', size: 17, weight: 'bold' })]}>
          Helvetica 17pt bold
        </Text>
        <Text modifiers={[font({ family: 'Helvetica', size: 17, weight: 'heavy' })]}>
          Helvetica 17pt heavy
        </Text>
      </VStack>
    </Section>
  );
}

function StatusBarSection() {
  return (
    <Section title="Status bar">
      <StatusBar style="auto" />
      <Text modifiers={[foregroundStyle('secondaryLabel')]}>
        Toggle Dark Mode in the simulator (Cmd+Shift+A) to confirm text styles read correctly in
        both color schemes.
      </Text>
    </Section>
  );
}
