
import React from "react";
import { Landscape, ChevronRight } from "@material-ui/icons";
import Naturvern from "../Naturvern";
import { useNavigate } from "react-router-dom";

const Utforsk = ({onToggleHovedMeny}) => {
  const navigate  = useNavigate();

  const onElementClick = (url) => {
    navigate(url);
    onToggleHovedMeny();
  }

  return (
    <div className="flexit">
      <button className="secondary"
        onClick={e => {
          onElementClick("/Natur_i_Norge/Natursystem");
        }}>        
          <img
            className="meny_ikon_image"
            src="/logoer/natursystem_ikon.png"
            alt=""
          />
          Natursystem <ChevronRight/>
        </button>

        <button className="secondary"
        onClick={e => {
          onElementClick("/Natur_i_Norge/Landskap");
        }}>
          <Landscape />Landskap <ChevronRight/>
        </button>

      <button className="secondary"
        onClick={e => {
          onElementClick("/Administrativ_grense");
        }}> 
        <img
            className="meny_ikon_image"
            src="/logoer/fylke_ikon.png"
            alt=""
          />Administrative grenser <ChevronRight/>
          </button>
     

      <button className="secondary"
        onClick={e => {
          onElementClick("/Naturvernområde/");
        }}>
          <Naturvern />Naturvernområder<ChevronRight/>
        </button>
      
    </div>
  );
}

export default Utforsk;
