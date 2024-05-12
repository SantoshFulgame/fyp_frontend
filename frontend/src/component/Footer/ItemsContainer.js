import Item from "./Item";
import { CUSTOMERS, COMPANY,PARTNERS, SUPPORT } from "./Menus";
import "./Footer.css";
const ItemsContainer = () => {
  return (
   
    <div id="change" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
    gap-6 sm:px-8 px-5 py-16">
     
      <Item Links={CUSTOMERS} title="FOR CUSTOMERS" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={PARTNERS} title="PARTNERS" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
    
  );
};

export default ItemsContainer;