import * as React from 'react'
import { generateCurvePath, IConfig, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPosition } from '../../'

export interface ILinkDefaultProps {
  config: IConfig
  link: ILink
  startPos: IPosition
  endPos: IPosition
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  isHovered: boolean
  isSelected: boolean
}

export const LinkDefault = ({
  config,
  link,
  startPos,
  endPos,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
  isHovered,
  isSelected,
}: ILinkDefaultProps) => {
  const points = generateCurvePath(startPos, endPos)
//  const centerX = startPos.x + (endPos.x - startPos.x) / 2
//  const centerY = startPos.y + (endPos.y - startPos.y) / 2
const width = Math.abs(startPos.x - endPos.x)
const height = Math.abs(startPos.y - endPos.y)

const leftToRight = startPos.x < endPos.x;
const topToBottom = startPos.y < endPos.y;
  const isHorizontal = width > height;
    var symbltxt="˃";
  if( (leftToRight && topToBottom && isHorizontal) || (leftToRight && topToBottom && !isHorizontal) || (!leftToRight && topToBottom && !isHorizontal) || (leftToRight && !topToBottom && isHorizontal) ){
    symbltxt="˃˃";
  }else{
    symbltxt="˂˂";
  }
  return (
    <svg style={{ overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 }}>
    <defs>
    <marker id='head' orient='auto' markerWidth='200' markerHeight='4'
            refX='0.1' refY='2'>
      <path d='M0,0 V4 L2,2 Z' fill='red' />
    </marker>

    <marker id='mid' orient="auto"
  markerWidth='2' markerHeight='4' refX='0.1' refY='1'>
  <path d='M0,0 V2 L1,1 Z' fill="orange"/>
</marker>

<path
    id="obj1"
    d="M11.18,0 L-2.5,10 -2.5,-10 Z"
    stroke="black" stroke-width="1" fill="green"
>
</path>
<path
    id="track1"
    d={points}
    stroke="#ff4444" stroke-width="2" fill="none"
/>
<pattern id="image" x="0%" y="0%" height="100%" width="100%"
         viewBox="0 0 512 512">
  <image x="0%" y="0%" width="512" height="512"  transform="rotate(45,100%,100%)" xlinkHref="https://simpleicon.com/wp-content/uploads/arrow-13.png"></image>
</pattern>
  </defs>
  <circle
    r="4"
    cx={startPos.x}
    cy={startPos.y}
    fill="cornflowerblue"
  />
  {/* Main line */}
  <path id={link.id}
  marker-end='url(#head)'

  d={points}
  marker-mid='url(#head)'
    stroke="cornflowerblue"
    strokeWidth="3"
    fill="none"
  />
  <text >
  <textPath style={{  fontFamily:"arrows",
fontSize: "27px",
fill: "blue",
dominantBaseline: "central"}} xlinkHref={"#"+link.id}  startOffset="50%">{symbltxt}  </textPath>

<textPath style={{
fontSize: "13px",
fill: "#000",
paddingBottom:"30px",}} xlinkHref={"#"+link.id}  startOffset="50%">
 <tspan dy="-5"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If-Then </tspan> </textPath>
  </text>
{/*

  leftToRight
   <path
       d="M11.18,0 L-2.5,10 -2.5,-10 Z"
       stroke="black" stroke-width="1" fill="green"
   >

       <animateMotion
           calcMode="linear"
           dur="infinite"
           repeatCount="infinite"
           rotate="auto"
           keyPoints="0.5;0.5"
           keyTimes="0.0;0.0"

       >
           <mpath xlinkHref="#track1"/>
       </animateMotion>
   </path>
     <use xlinkHref="#obj1"><circle
    r="13"
    cx={centerX}
    cy={centerY}
    fill="url(#image)"
  >


  </circle>
*/}
  <animateMotion
               xlinkHref="#mid"
               dur="1.2s"
               begin="click"
               fill="freeze"
               calcMode="spline"
               keyTimes="0; 0.5; 1"
               keySplines="0 0 1 1;
                           .42 0 .58 1;"

               d={points}   />


      {/* Thick line to make selection easier */}
      <path
        d={points}
        stroke="cornflowerblue"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeOpacity={(isHovered || isSelected) ? 0.1 : 0}
        onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
        onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
        onClick={(e) => {
          onLinkClick({ config, linkId: link.id })
          e.stopPropagation()
        } }
      />
    {/*  <circle
        r="4"
        cx={endPos.x}
        cy={endPos.y}
        fill="cornflowerblue"
      />*/}
    </svg>
  )
}
