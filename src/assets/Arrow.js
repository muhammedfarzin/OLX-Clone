import React from 'react'
import './Arrow.css'

export default function Arrow(props) {
  return (
      <svg
        width={props.small ? "12px" : "24px"}
        height={props.small ? "12px" : "24px"}
        viewBox="0 0 1024 1024"
        data-aut-id="icon"
        className={props.rotate ? "arrowDiv rotate" : "arrowDiv"}
        fillRule="evenodd"
      >
        <path
          className="rui-77aaa"
          d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"
        />
      </svg>)
}