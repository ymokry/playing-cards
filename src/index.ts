import Resources from "@/features/resources";
import { prepareDist } from "@/utils/file";

await Resources.load();
await prepareDist();
