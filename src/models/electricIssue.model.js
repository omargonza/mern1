import mongoose from "mongoose";

const electricIssueSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Types.ObjectId,
      ref: "Task", // referencia al modelo de Task
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    issueType: {
      type: String,
      enum: ['Cortocircuito', 'Pérdida de Aislamiento', 'Variación de Tensión', 'robo de cable', 'Otro'],
      required: true
    },
    details: {
      type: String,
      required: true
    },
    // Agrega cualquier otra información relevante sobre el problema eléctrico aquí
  },
  {
    timestamps: true
  }
);

export default mongoose.model("ElectricIssue", electricIssueSchema);
