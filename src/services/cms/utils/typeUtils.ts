
import { Json } from "@/integrations/supabase/types";

/**
 * Safely casts a value to Json type for database storage
 * This is a type assertion function to help TypeScript understand
 * the conversion between our domain types and the Supabase Json type
 */
export function toJson<T>(value: T): Json {
  return value as unknown as Json;
}

/**
 * Safely casts a Json value from database to a specific type
 */
export function fromJson<T>(json: Json | null, defaultValue: T): T {
  if (json === null || json === undefined) {
    return defaultValue;
  }
  return json as unknown as T;
}
