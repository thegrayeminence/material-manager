
//FORM INPUT DATA : OPTIONS FOR SELECT INPUTS

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
  { value: "glossy", label: "Glossy-Specular" },
  { value: "custom", label: "Custom/Non-PBR" },
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


//MATERIAL AUTOSUGGESTION DATA//

const colorOptionsUnfiltered = [
  "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Black", "White", "Grey", "Pink",
  "Crimson", "Scarlet", "Magenta", "Violet", "Indigo", "Cyan", "Turquoise", "Teal", "Maroon", "Olive",
  "Beige", "Brown", "Burgundy", "Coral", "Gold", "Silver", "Bronze", "Copper", "Ivory", "Jade",
  "Lavender", "Lilac", "Mint", "Navy", "Peach", "Plum", "Rose", "Ruby", "Saffron", "Salmon",
  "Sapphire", "Tangerine", "Taupe", "Ultramarine", "Amber", "Aquamarine", "Azure", "Blush",
  "Champagne", "Charcoal", "Chestnut", "Chocolate", "Cobalt", "Cream", "Emerald", "Fuchsia", "Gunmetal", "Harlequin",
  "Indigo", "Iris", "Khaki", "Lemon", "Lime", "Mahogany", "Mauve", "Mustard", "Ochre", "Opal",
  "Orchid", "Periwinkle", "Persimmon", "Pewter", "Raspberry", "Rose Gold", "Rust", "Sage", "Sangria", "Sapphire",
  "Scarlet", "Seafoam", "Sepia", "Sienna", "Slate", "Smoke", "Steel", "Tan", "Thistle", "Turquoise",
  "Vanilla", "Vermilion", "Viridian", "Wheat", "Wisteria", "Zinc", "Bright Red", "Dark Blue", "Light Green", "Deep Purple",
  "Glowing", "Matte", "Shiny", "Luminous", "Radiant", "Dull", "Vibrant", "Pale", "Dark", "Light",
  "Neon", "Pastel", "Saturated", "Soft", "Muted", "Vivid", "Sheer", "Opaque", "Translucent", "Glossy"
]

export const colorOptions = [...new Set(colorOptionsUnfiltered)];

 const elementTypeOptionsUnfiltered = [
  "Aluminum", "Brass", "Bronze", "Copper", "Gold", "Iron", "Lead", "Nickel",
  "Platinum", "Silver", "Steel", "Tin", "Titanium", "Zinc", "Carbon Fiber",
  "Ceramic", "Clay", "Concrete", "Granite", "Marble", "Porcelain", "Slate",
  "Stone", "Terracotta", "Acrylic", "Nylon", "Polycarbonate", "Polyester",
  "Polyethylene", "Polypropylene", "Polystyrene", "PVC", "Rubber", "Silicone",
  "Urethane", "Bamboo", "Cedar", "Cherry", "Ebony", "Mahogany",
  "Maple", "Oak", "Pine", "Redwood", "Teak", "Walnut", "Cotton", "Denim",
  "Felt", "Flannel", "Leather", "Linen", "Satin", "Silk", "Velvet", "Wool",
  "Skin", "Fur", "Latex", "Paint", "Stucco", "Varnish",
  "Glass", "Obsidian", "Plexiglass", "StainedGlass", "TemperedGlass",
  "Amber", "Coral", "Ivory", "Pearl", "Bone", "Horn",
  "Paper", "Cardboard", "Cork", "Foam", "Graphite", "Wax", "Gelatin",
  "Resin", "Plaster", "Fiberglass", "Kevlar", "Neoprene", "Spandex",
  "Vinyl", "Asphalt", "Coal", "Plaster", "Sponge", "Tarp", "Porcelain",
  "Ceramic", "Enamel", "Silk", "Woolen", "Cotton", "Linen", "Leather", 
  "Fur", "Velvet", "Satin", "Lace", "Denim", "Knitted", "CarbonFiber",
]

export const elementTypeOptions = [...new Set(elementTypeOptionsUnfiltered)];


const conditionOptionsUnfiltered = [ "New", "Old", "Rusty", "Polished", "Dusty", "Clean", "Worn", "Pristine", 
"Damaged", "Repaired", "Shiny", "Matte", "Scratched", "Smooth", "Rough", "Tarnished", "Stained", 
"Faded", "Cracked", "Chipped", "Glossy", "Burnished", "Soiled", "Washed", "Untreated", "Treated", 
"Coated", "Uncoated", "Weathered", "Fresh", "Brittle", "Solid", "Liquid", "Soft", "Hard", "Brittle", 
"Elastic", "Flexible", "Stiff", "Durable", "Fragile", "Blemished", "Sealed", "Unsealed", "Polished", 
"Grained", "Laminated", "Wrinkled", "Creased", "Folded", "Crumbled", "Pressed", "Compacted", "Loose", 
"Tight", "Extended", "Compressed", "Expanded", "Contracted", "Swollen", "Dried", "Moist", "Wet", "Soggy", 
"Humid", "Dry", "Saturated", "Desiccated", "Hydrated", "Dehydrated", "Gleaming", "Lustrous", "Sparkling", 
"Dull", "Blunt", "Sharp", "Pointed", "Flat", "Round", "Curved", "Angular", "Symmetrical", "Asymmetrical", 
"Uniform", "Variegated", "Striped", "Spotted", "Sprinkled", "Marbled", "Veined", "Woven", "Embroidered", 
"Painted", "Glazed", "Plated", "Filigreed", "Carved", "Engraved", "Etched", "Printed", "Stamped", "Welded",
 "Forged", "Cast", "Molded", "Sculpted", "Cut", "Chiseled", "Shaped", "Formed", "Constructed", "Built", 
 "Assembled", "Disassembled", "Reconstructed", "Recycled", "Renovated", "Restored", "Preserved", 
 "Maintained","Updated", "Modernized", "Antique", "Vintage", "Retro", "Contemporary",
 "Traditional", "Classic", "Historic", "Timeless", "Period", "Baroque", "Gothic", 
 "Victorian", "Modern", "Futuristic", "Gaseous", "Luminous", ]

export const conditionOptions = [...new Set(conditionOptionsUnfiltered)]; 
 
const manifestationOptionsUnfiltered = [
  "Table", "Chair", "Couch", "Bed", "Desk", "Shelf", "Cabinet", "Drawer", "Lamp", "Rug",
  "Carpet", "Curtain", "Pillow", "Blanket", "Mirror", "Clock", "Vase", "Bowl", "Plate", "Cup",
  "Knife", "Fork", "Spoon", "Pot", "Pan", "Oven", "Stove", "Microwave", "Fridge", "Freezer",
  "Toaster", "Blender", "Mixer", "Juicer", "Teapot", "Kettle", "Grill", "Book", "Notebook", "Pen",
  "Pencil", "Brush", "Paint", "Canvas", "Frame", "Statue", "Sculpture", "Computer", "Laptop", "Monitor",
  "Keyboard", "Mouse", "Printer", "Scanner", "Camera", "Television", "Radio", "Speaker", "Headphones", "Phone",
  "Smartphone", "Tablet", "Watch", "Drone", "Robot", "Toy", "Bicycle", "Car", "Motorcycle", "Boat",
  "Ship", "Plane", "Helicopter", "Train", "Bus", "Truck", "Scooter", "Skateboard", "Skates", "Ski",
  "Snowboard", "Surfboard", "Paddle", "Oar", "Racket", "Ball", "Bat", "Glove", "Helmet", "Goggles",
  "Mask", "Suit", "Dress", "Coat", "Shirt", "Pants", "Skirt", "Hat", "Shoes", "Boots",
  "Sandals", "Socks", "Belt", "Tie", "Scarf", "Jewelry", "Necklace", "Bracelet", "Ring", "Earrings",
  "Brooch", "Sunglasses", "Glasses", "Bag", "Purse", "Wallet", "Backpack", "Suitcase", "Box", "Container",
  "Basket", "Bin", "Bucket", "Bottle", "Jar", "Can", "Tin", "Mug", "Glass", "Vial",
  "Flask", "Jug", "Pitcher", "Door", "Window", "Wall", "Floor", "Ceiling", "Roof", "Fence",
  "Gate", "Path", "Road", "Bridge", "Tower", "Building", "House", "Office", "Shop", "Store",
  "Factory", "Warehouse", "Barn", "Garage", "Shed", "Gym", "Park", "Garden", "Forest", "Field",
  "Mountain", "Hill", "Valley", "River", "Lake", "Sea", "Ocean", "Beach", "Desert", "Meadow",
  "Jungle", "Rainforest", "Swamp", "Marsh", "Prairie", "Tundra", "Iceberg", "Glacier", "Canyon", "Cliff",
  "Plateau", "Mesa", "Summit", "Peak", "Volcano", "Cave", "Grotto", "Chasm", "Abyss", "Quarry",
  "Garden", "Orchard", "Vineyard", "Farm", "Ranch", "Terrace", "Porch", "Balcony", "Patio", "Deck",
  "Lobby", "Hall", "Foyer", "Corridor", "Alley", "Avenue", "Street", "Tree", "Flower", "Plant", "Grass",
  "Candle", "Fireplace", "Fire", "Torch", "Lantern", "Lamp", "Light", "Chandelier", "Lampshade", "Candlestick",
  "Sword", "Axe", "Spear", "Shield", "Bow", "Arrow", "Dagger", "Knife", "Gun", "Rifle", "Pistol",
  "Musket", "Cannon", "Bomb", "Missile", "Rocket", "Tank", "Aircraft", "Ship", "Submarine", "Satellite",
  "Leaf", "Branch", "Root", "Trunk", "Bark", "Flower", "Fruit", "Seed", "Nut", "Grain",
  "Vegetable", "Herb", "Spice", "Meat", "Fish", "Egg", "Milk", "Cheese",
  "Salt", "Sugar", "Honey", "Bread", "Cake", "Pastry", "Pie", "Pizza", "Pasta", "Gas", "Plasma", "Neon", "Carbon",
  "Rock", "Rubble", "Brick", "Tile", "Sand", "Dirt", "Mud", "Clay", "Gravel", "Pebble",
  "Wood", "Log", "Stick", "Twig", "Branch", "Leaf", "Bark", "Root", "Trunk", "Paper",
  "Cardboard", "Cork", "Foam", "Graphite", "Wax", "Gelatin", "Resin", "Plaster", "Fiberglass", "Kevlar",
]

export const manifestationOptions = [...new Set(manifestationOptionsUnfiltered)]; 

