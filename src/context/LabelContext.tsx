import React, { createContext, useContext, useState, ReactNode } from "react";

interface Label {
  id: number;
  text: string;
  color: string;
}

interface LabelContextType {
  labels: Label[];
  addLabel: (newLabel: Label) => void;
}

const LabelContext = createContext<LabelContextType | undefined>(undefined);

export const useLabelContext = (): LabelContextType => {
  const context = useContext(LabelContext);
  if (context === undefined) {
    throw new Error("useLabelContext must be used within a LabelProvider");
  }
  return context;
};

interface LabelProviderProps {
  children: ReactNode;
}

export const LabelProvider: React.FC<LabelProviderProps> = ({ children }) => {
    const storedLabels = localStorage.getItem("labels");
    const initialLabels = storedLabels ? JSON.parse(storedLabels) : [];
  const [labels, setLabels] = useState<Label[]>(initialLabels);

  const addLabel = (newLabel: Label) => {
    const updatedLabels = [...labels, newLabel];
    setLabels(updatedLabels);
    localStorage.setItem("labels", JSON.stringify(updatedLabels));
  };

  return (
    <LabelContext.Provider value={{ labels, addLabel }}>
      {children}
    </LabelContext.Provider>
  );
};
