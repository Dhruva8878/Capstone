import { Slider } from "../Slider/Slider"


export const Home = () =>{
    localStorage.removeItem('user_id');
    return(
        
<div>
    <Slider/>
    <h1 style={{"text-align": "center"}}>ACS {">>>"} Home</h1>

    <p style={{"text-align": "justify"}}>Lorem ipsum dolor sit dignissimos esse obcaecati quaerat voluptate labore harum
      fugiat temporibus est quos, nulla in officia. Perspiciatis laborum beatae ullam molestiae pariatur deleniti,
      consequuntur culpa corporis consectetur molestias accusantium nulla aperiam recusandae facilis! Quidem dolores
      recusandae illo animi eveniet quia illum, incidunt in repellendus. Possimus nesciunt enim in expedita?
      Inventore enim ratione itaque illo. Facilis quo nobis minus? Laborum harum itaque atque repudiandae sint! Quo
      expedita ex veritatis sint eligendi voluptatem pariatur, adipisci sunt quam quis deserunt eaque ad nesciunt
      doloremque dolorem!</p>

  </div>

    )
}