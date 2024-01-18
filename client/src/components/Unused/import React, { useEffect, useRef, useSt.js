// import React, {useEffect, useRef, useState} from 'react';
// import * as d3 from 'd3';
// import {Box, Text} from '@chakra-ui/react';
// import {motion, AnimatePresence} from 'framer-motion';

// const JsonTreeVisualization = ({materialData}) => {
//     const d3Container = useRef(null);
//     const [selectedNode, setSelectedNode] = useState(null);

//     useEffect(() => {
//         if (materialData && Object.keys(materialData).length !== 0 && d3Container.current) {
//             d3.select(d3Container.current).selectAll("*").remove();

//             let hierarchyData = d3.hierarchy(materialData, (d) => {
//                 return d && typeof d === 'object' ? Object.values(d).filter(v => typeof v === 'object') : [];
//             });
//             const width = "80vw"; // Example dynamic width value based on viewport width
//             const padX = `calc(${width} / 2 - 45px)`; // Adjust the formula as needed
//             const maxH = "50vh";
//             const pady = `calc(${height} / 2 - 45px)`; // Adjust the formula as needed

//             const dx = '10rem';
//             const dy = pady / (hierarchyData.height + 1);
//             const tree = d3.tree().nodeSize([dx, dy]);
//             const root = tree(hierarchyData);

//             let x0 = Infinity;
//             let x1 = -x0;
//             root.each(d => {
//                 if (d.x > x1) x1 = d.x;
//                 if (d.x < x0) x0 = d.x;
//             });

//             const svg = d3.select(d3Container.current)
//                 .attr("viewBox", [0, 0, width, x1 - x0 + dx * 2])
//                 .attr("style", "overflow: visible");

//             const g = svg.append("g")
//                 .attr("transform", `translate(${dy / 3},${dx - x0})`);

//             const link = g.append("g")
//                 .attr("fill", "none")
//                 .attr("stroke", "#555")
//                 .attr("stroke-opacity", 0.4)
//                 .attr("stroke-width", 1.5)
//                 .selectAll("path")
//                 .data(root.links())
//                 .join("path")
//                 .attr("d", d3.linkHorizontal()
//                     .x(d => d.y)
//                     .y(d => d.x));

//             const node = g.append("g")
//                 .attr("stroke-linejoin", "round")
//                 .attr("stroke-width", 3)
//                 .selectAll("g")
//                 .data(root.descendants())
//                 .join("g")
//                 .attr("transform", d => `translate(${d.y},${d.x})`);

//             // Node and text styling
//             node.append("circle")
//                 .attr("fill", d => d.depth === 0 ? "#ff6347" : d.depth === 1 ? "#4682b4" : "#32cd32") // Root, first and second level colors
//                 .attr("r", 2.5);

//             node.append("text")
//                 .attr("dy", "0.31em")
//                 .attr("x", d => d.children ? -6 : 6)
//                 .attr("text-anchor", d => d.children ? "end" : "start")
//                 .text(d => d.data.label || d.data.value || JSON.stringify(d.data))
//                 .attr("fill", d => d.depth === 0 ? "#ff6347" : d.depth === 1 ? "#4682b4" : "#32cd32") // Matching text colors
//                 .attr("font-family", "Arial")
//                 .attr("font-size", "12px")
//                 .clone(true).lower()
//                 .attr("stroke", "white");

//             node.on("mouseover", (event, d) => {
//                 setSelectedNode(d);
//             }).on("mouseout", () => {
//                 setSelectedNode(null);
//             });
//         }
//     }, [materialData]);

//     return (
//         <Box position="relative">
//             <svg
//                 className="d3-component"
//                 width={800}
//                 height={400}
//                 ref={d3Container}
//             />
//             <AnimatePresence>
//                 {selectedNode && (
//                     <motion.div
//                         initial={{opacity: 0, scale: 0.5}}
//                         animate={{opacity: 1, scale: 1}}
//                         exit={{opacity: 0, scale: 0.5}}
//                         style={{position: 'absolute', left: selectedNode.y, top: selectedNode.x, pointerEvents: 'none'}}
//                     >
//                         <Box p="2" bg="white" boxShadow="md" borderRadius="md">
//                             <Text fontSize="sm" fontWeight="bold">
//                                 {selectedNode.data.label || selectedNode.data.value || JSON.stringify(selectedNode.data)}
//                             </Text>
//                         </Box>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </Box>
//     );
// };

// export default JsonTreeVisualization;
