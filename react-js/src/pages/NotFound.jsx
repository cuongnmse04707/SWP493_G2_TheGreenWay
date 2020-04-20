import React, { Component } from 'react';
import "../css/not-found.css"

class NotFound extends Component {
  render() {
    return (
      <div style={{background: "white", left: "0", height: "100vh", width:"100vw", position: "fixed"}} className="test-not-found">
      <section class="page_404">
	<div class="container">
		<div class="row">
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>


		</div>

		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>

		<p>the page you are looking for not avaible!</p>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
      </div>
    );
  }
}

export default NotFound;