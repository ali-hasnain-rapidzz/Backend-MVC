import { registerPostSavePlugin } from "@Plugins/registerPostSave.plugin";
import mongoose from "mongoose";

// Apply the plugin to all schemas
mongoose.plugin(registerPostSavePlugin);
