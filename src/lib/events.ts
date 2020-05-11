import { EventBus, createEventDefinition } from "ts-bus";

// Create bus
export const bus = new EventBus();

// events
export const KonnakolPlayerPlayEvent = createEventDefinition<{ playing: boolean }>()("KonnakolPlayer.Play");