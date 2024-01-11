
//FORM INPUT DATA (forminputdata.js)



  export const textureMapOptionsCommon = [
    { value: "albedo", label: "Albedo" },
    { value: "diffuse", label: "Diffuse" },
    { value: "specular", label: "Specular" },
    { value: "normal", label: "Normal" },
    { value: "bump", label: "Bump" },
    { value: "displacement", label: "Displacement" },
    { value: "roughness", label: "Roughness" },
    { value: "metallic", label: "Metallic" },
    { value: "ambientOcclusion", label: "Ambient Occlusion" },
    { value: "emissive", label: "Emissive" },
    { value: "height", label: "Height" },
    { value: "opacity", label: "Opacity" },
    { value: "subsurfaceScattering", label: "Subsurface Scattering" },
    { value: "reflection", label: "Reflection" },
    { value: "refraction", label: "Refraction" }
  ];
  

  export const textureMapOptionsPBRMetalRough = [
    { value: "baseColor", label: "Base Color" },
    { value: "normal", label: "Normal Map" },
    { value: "height", label: "Height Map" },
    { value: "metallic", label: "Metallic" },
    { value: "roughness", label: "Roughness" },
    { value: "ambientOcclusion", label: "Ambient Occlusion" },
    { value: "emissive", label: "Emissive" }
  ];

  export const textureMapOptionsPBRGlossSpec = [
    { value: "diffuse", label: "Diffuse" },
    { value: "specular", label: "Specular" },
    { value: "glossiness", label: "Glossiness" },
    { value: "normal", label: "Normal Map" },
    { value: "height", label: "Height Map" },
    { value: "ambientOcclusion", label: "Ambient Occlusion" }
  ];
  
  

  export const materialTypeOptions = [
    { value: "metallic", label: "Metallic-Roughness" },
    { value: "glossy", label: "Glossy-Specular"},
    { value: "custom", label: "Custom/Non-PBR"},
  ];

  
  export const engineOptions = [
    { value: "unreal", label: "Unreal Engine" },
    { value: "unity", label: "Unity" },
    { value: "redshift", label: "Redshift" },
    { value: "vray", label: "V-Ray" },
    { value: "arnold", label: "Arnold" },
    { value: "octane", label: "Octane Render" },
    { value: "corona", label: "Corona Renderer" },
    { value: "renderman", label: "RenderMan" },
    { value: "lumion", label: "Lumion" },
    { value: "blenderEEVEE", label: "Blender EEVEE" }
  ];

  export const programOptions = [
    { value: "maya", label: "Maya" },
    { value: "blender", label: "Blender" },
    { value: "3dsMax", label: "3ds Max" },
    { value: "cinema4D", label: "Cinema 4D" },
    { value: "houdini", label: "Houdini" },
    { value: "substancePainter", label: "Substance Painter" },
    { value: "zBrush", label: "ZBrush" },
    { value: "modo", label: "Modo" },
    { value: "sketchUp", label: "SketchUp" },
    { value: "autodeskRevit", label: "Autodesk Revit" }
  ];
  

  export const metaDataOptions = [
    {
      label: "Rendering Engine",
      options: engineOptions
    },
    {
      label: "Program",
      options: programOptions
    }
  ];
  