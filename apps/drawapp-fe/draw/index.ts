import { HTTP_BACKEND } from "@/config"
import axios from "axios"

type Shapes = {
  type: "rect"
  x: number
  y: number
  width: number
  height: number
} | {
  type: "circle"
  centerX : number
  centerY : number
  radius: number

}
export default async function initDraw(canvas: HTMLCanvasElement, roomId: string) {
  
  

       const ctx = canvas.getContext("2d");
      let existingShape: Shapes[] = await getExistingShapes(roomId)
      if (!ctx) {
        return;
      }

  
    
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let clicked = false;
      let startX = 0;
      let startY = 0;
      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });
      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width  = e.clientX - startX
        const height = e.clientY - startY

        existingShape.push({
          type: "rect",
          x: startX,
          y: startY,
          width,
          height 
        })
      });

      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          let width = e.clientX - startX;
          let height = e.clientY - startY;
          clearCanvas(existingShape, canvas, ctx)                           
         
          ctx.strokeStyle = "rgba(255,255,255)";
          ctx.strokeRect(startX, startY, width, height);
          console.log(e.clientX);
          console.log(e.clientY);
        }
      });       
}

function clearCanvas (existingShape: Shapes[], canvas: HTMLCanvasElement, ctx:CanvasRenderingContext2D){
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(0,0,0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          existingShape.map((shape) => {
            if(shape.type == "rect"){
               ctx.strokeStyle = "rgba(255,255,255)";
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
          })
          

}

async function getExistingShapes (roomId: string){
 const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
 const messages = res.data.messages

 const shapes = messages.map((x: {message: string  }) => {
  const messageData = JSON.parse(x.message)
  return messageData
 })
 return shapes
 
} 