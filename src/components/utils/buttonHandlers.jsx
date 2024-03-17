import SystemDeseaseComponent from "../SystemDeseaseComponent";
import { ProblemComponent } from "../ECOP/ProblemComponent";
import { DiagnosticComponent } from "../ECOP/DiagnosticComponent";

export const handleButtonClickDesease = (deseaseComponents, setDeseaseComponents, handleSystemChange, handleEnfermedadChange) => {
    const newComponent = (
      <SystemDeseaseComponent
        key={deseaseComponents.length}
        onSubmit={handleSystemChange}
        onEnfermedadChange={handleEnfermedadChange}
      />
    );
  
    setDeseaseComponents(prevComponents => [...prevComponents, newComponent]);
  };
  
  export const handleButtonClickProblem = (problemsComponents, setProblemsComponents) => {
    const newComponentProblem = (
      <ProblemComponent
        key={problemsComponents.length}
      />
    );
  
    setProblemsComponents(prevComponents => [...prevComponents, newComponentProblem]);
  };

  export const handleButtonClickDiagnostic = (diagnosticComponents, setDiagnosticComponents) => {
    const newComponentDiagnostic = (
      <DiagnosticComponent
        key={diagnosticComponents.length}
      />
    );
  
    setDiagnosticComponents(prevComponents => [...prevComponents, newComponentDiagnostic]);
  };

  export const handleButtonClickTerapeutic = (terapeuticComponents, setTerapeuticComponents) => {
    const newComponentTerapeutic = (
      <DiagnosticComponent
        key={terapeuticComponents.length}
      />
    );
  
    setTerapeuticComponents(prevComponents => [...prevComponents, newComponentTerapeutic]);
  };

  export const handleButtonClickPasantes = (terapeuticComponents, setTerapeuticComponents) => {
    const newComponentTerapeutic = (
      <DiagnosticComponent
        key={terapeuticComponents.length}
      />
    );
  
    setTerapeuticComponents(prevComponents => [...prevComponents, newComponentTerapeutic]);
  };
  