import YAML from "yaml";

export function yaml(content: string): unknown {
  return YAML.parse(content);
}
