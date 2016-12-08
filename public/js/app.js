"use strict";

class App{
	constructor(){
		this.musics = [
			{
				"id": 1,
					"Band":"Paramore",
		            "Album":"Brand New Eyes",
		            "Year":"2009",
		            "Poster":"img/paramore.jpg",
			},
			{
				"id": 2,
					"Band":"Blink 182",
		            "Album":"California",
		            "Year": "2016",
		            "Poster":"img/blink182.jpg",
			},
			{
				"id": 3,
					"Band":"Our Last Night",
		            "Album":"Younger Dreams",
		            "Year":"2015",
		            "Poster":"img/ourlastnight.jpg",
				
			},
			{
				"id": 4,
					"Band":"Zedd",
		            "Album":"True Colors",
		            "Year":"2015",
		            "Poster":"img/zedd.jpg",
				
			},
			{
				"id": 5,
					"Band":" Robin Schulz",
		            "Album":"Prayer",
		            "Year":"2014",
		            "Poster":"img/rb.jpg",
				
			},
			{
				"id": 6,
					"Band":"Twenty One Pilots",
		            "Album":"Blurry Face",
		            "Year":"2015",
		            "Poster":"img/top.jpg",
				
			},
			
		];
	}

	render(html, component){

		component.innerHTML += html;
	}

	reRender(html, component){

		component.innerHTML = html;
	}

	createMusic(){
		let b = document.getElementById('newBand');
		let a = document.getElementById('newAlbum');
		let y = document.getElementById('newYear');
		let p = document.getElementById('newPoster');
		

		let music = {"Band":b.value,"Album":a.value,"Year":y.value,"Poster":p.value};
		this.musics.push(music);

		b.value = a.value = y.value = p.value =''; //Clear Fields
		this.musicListInfo();
	}

	deleteMusic(key){		
		let table = document.getElementById('musicListInfo');
		table.deleteRow(key);
		this.musics.splice(key,1);

		let details = document.getElementById('musicDetails');
		details.innerHTML = "";
		
		this.musicListInfo();	
		this.showMusicList();	
	}

	updateMusic(key){
		let b = document.getElementById('updateBand');
		let a = document.getElementById('updateAlbum');
		let y = document.getElementById('updateYear');
		

		let m = this.musics[key];
		let music = {"id":m.id,"Band":b.value,"Album":a.value,"Year":y.value,"Poster":m.Poster};

		this.musics[key] = music;
		let details = document.getElementById('musicDetails');
		details.innerHTML = "";
		
		this.musicListInfo();
		this.showMusicList();
	}

	showLandingPage(){
		$('#landingpage').show();
		$('#createpage').hide();
		$('#header').hide();
		$('#readpage').hide();
		$('#updatedeletepage').hide();


	}	

	showMusicList(){
		$('#landingpage').hide();
		$('#createpage').hide();
		$('#readpage').show();
		$('#header').show();
		$('#updatedeletepage').hide();
	}

	showMusicCreate(){
		$('#landingpage').hide();
		$('#createpage').show();		
		$('#readpage').hide();
		$('#header').show();
		$('#updatedeletepage').hide();
	}

	showUpdateDelete(){
		$('#landingpage').hide();
		$('#createpage').hide();		
		$('#readpage').hide();
		$('#header').show();
		$('#updatedeletepage').show();
	}	

	searchMusic(value=""){
		let objects = [];
		let r = this.musics;
		for(let i=0;i<r.length;i++){
			// console.log("r:",r[i].Title.toUpperCase().indexOf(title.toUpperCase()));
			let expr1 = (r[i].Band.toUpperCase().indexOf(value.toUpperCase()) > -1);
			let expr2 = (r[i].Album.toUpperCase().indexOf(value.toUpperCase()) > -1);
			// console.log(name," vs ",r[i].name," = ",expr);
			if(expr1 || expr2){
				objects.push(r[i]);
			}
		}
		return objects;		
	}
}

class Component extends App{
	constructor(){
		super();
	}

	musicList(){
		this.render(
			`	      

			<header class="w3-container w3-xlarge w3-black w3-padding-20">
			    <a href="#" class="w3-left w3-btn w3-black" onclick="component.showLandingPage()">La Musique</a>
			    <a href="#about" class="w3-right w3-btn w3-black" onclick="component.showMusicCreate()">Add Music</a>
			    <a href="#about" class="w3-right w3-btn w3-black" onclick="component.showMusicList()">Musics</a>
			</header>


			<div id="landingpage">
			<header class="w3-display-container w3-wide" id="home">
			    <img class="w3-image" src="img/cover1.jpg" alt="Fashion Blog" width="1600" height="1060">
			    <div class="w3-display-left w3-padding-xlarge">
			      <h1 class="w3-text-white">Welcome to</h1>
			      <h1 class="w3-jumbo w3-text-white w3-hide-small"><b>LA MUSIQUE</b></h1>
			    </div>
			</header>
			</div>
				
			<div id="header">
	            <header class="w3-container w3-center w3-padding-48 w3-white">
			    <h1 class="w3-xxxlarge"><b>LA MUSIQUE</b></h1>
			    <h6>Welcome to<span class="w3-tag">La Musique</span></h6>
			  	</header>
	          </div>
			</div>


				<div id="createpage" class="row marketing">
					<div class="col col-sm-12">
						<div id="musicCreate"></div>						
					</div>
					</div>

				<div id="readpage" class="row marketing">
					<div class="col col-sm-12">
						<h1 class= "w3-xxxlarge" style="text-align: center">Music List</h1>
						<table id="musicList" class="table">
							<thead>
								<tr>
									<th class="w3-black">Band</th>
									<th class="w3-black">Album</th>
									<th class="w3-black">Action</th>
								</tr>
							</thead>
							<div class="form-group" style ="margin:0 50px">
							    <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
							    <div class="input-group">
							      <div class="input-group-addon w3-black">
									  <span class="fa fa-search "></span>
									  <!-- checkout other fontawesome icons at http://fontawesome.io/icons/ -->
							      </div>
							      <input oninput="component.musicListInfo(this.value)" type="text" class="form-control" placeholder="Search">
							    </div>
							  </div>
							<tbody id="musicListInfo"></tbody>
						</table>
					</div>
				</div>

				<div id="updatedeletepage" class="row marketing">
					<div id="musicDetails"></div>
				</div>
				

				<footer class="w3-black w3-padding-64 w3-center" id="about">
				<a href="#" class="w3-btn w3-padding-large w3-margin-bottom w3-light-black"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
				<h6>La Muqique | Band | Song Lyrics | Add Song</h6>
	  			<p class="w3-medium">© 2014 Copyright Lyeah Carina S. Dasalla</p>
				</footer>

			`
			,document.getElementById('app'));
		this.musicListInfo();
		$('#landingpage').show();
		$('#createpage').hide();		
		$('#readpage').hide();
	}
	
	musicListInfo(filter){
		// console.log(filter);
		let html = "";
		// let m = this.movies;
		let m = this.searchMusic(filter);
		for(let i=0;i<m.length;i++){	
			html += `
				<tr>
					<td>${m[i].Band}</td>
					<td>${m[i].Album}</td>
					<td><button class="w3-btn w3-black"  onclick="component.musicDetails(${i})">Show Details</button></td>
				</tr>
			`;
		}
		this.reRender(html,document.getElementById('musicListInfo'));
	}

	musicDetails(key){
		this.reRender(
			`
				<h1 class= "w3-xxxlarge" style="text-align: center"> Music Details</h1>
				<div class="media w3-center">
				    <div class="media-center">
				        <a href="#">
				            <img class="img-thumbnail" style="length: 800px;width:500px"  src="${this.musics[key].Poster}" width="220" />
				        </a>
				    </div>
				    </br>
				    <div class="media-body" id="musicDetailsInfo">
				        <h4 class="media-heading">${this.musics[key].Band}</h4>
				        Album: ${this.musics[key].Album}<br/>
						Year: ${this.musics[key].Year}<br/>
						</br>
						<button class="w3-btn w3-black" onclick="component.musicUpdate(${key})">Update</button>
						<button class="w3-btn w3-black" onclick="component.deleteMusic(${key})">Delete</button>
						<button class="w3-btn w3-black" onclick="component.showMusicList()">Back</button>
					</div>	
				</div>	
				<br/>
				<br/>
				<br/>
				<br/>

			`,document.getElementById('musicDetails'));
			this.showUpdateDelete();
	}

	musicCreate(){
		this.render(
			`
				<h1 style="text-align: center">Music Create</h1>
				<div class= "w3-center>"
					<input class="w3-input w3-border" style ="margin:0 100px"/><br/>
					Band: <input class="w3-input w3-border" id="newBand" type="" placeholder="Enter Band" /><br/>
					Album: <input class="w3-input w3-border" id="newAlbum" type="" placeholder="Enter Album" /><br/>
					Year: <input class="w3-input w3-border" id="newYear" type="" placeholder="Enter Year" /><br/>
					Poster: <input class="w3-input w3-border" id="newPoster" type="" placeholder="Enter Poster" /><br/>
					<button class="w3-btn w3-black" onclick="component.createMusic()">Create</button>
					<br/>
					<br/>
					<br/>
					<br/>
				</div>
			`,document.getElementById('musicCreate'));
	}

	musicUpdate(key){
		this.reRender(
			`
			</br>
			</br>
		        <div class="input-group input-group-md" style ="margin:0 100px">
		        	<span class="w3-black input-group-addon">
		        		<span>Title</span>
		        	</span>
		        	<input class="form-control" id="updateBand" type="text" value="${this.musics[key].Band}" /><br/>
		        </div>
		        <br/>
		        <div class="input-group input-group-md" style ="margin:0 100px">
		        	<span class="w3-black input-group-addon">
		        		<span>Year</span>
		        	</span>
		        	<input class="form-control" id="updateAlbum" type="text" value="${this.musics[key].Album}" /><br/>
		        </div>
		        <br/>
		        <div class="input-group input-group-md" style ="margin:0 100px">
		        	<span class="w3-black input-group-addon">
		        		<span>Director</span>
		        	</span>
		        	<input class="form-control" id="updateYear" type="text" value="${this.musics[key].Year}" /><br/>
		        </div>	
		        <br/>
				<button class="w3-btn w3-black" onclick="component.updateMusic(${key})">Save</button>
				<br/>
				<br/>
				<br/>
				<br/>
			`,document.getElementById('musicDetailsInfo'));
	}

	RecentActivity(){
    
    let html = `

    <div class="w3-black w3-row-padding w3-padding-32">
    `;

    let r = this.musics;
    let count = 0;
    for(let i=(r.length-1);i>=0;i--){
      if(count++ === 4)break;
      html+= `
  		<div class="w3-col s8 m6">
          <div class="w3-row-padding w3-padding-32 style="margin:0 -5px">
            <div class="w3-third w3-margin-bottom"">
               <img src="${r[i].Poster}" style="length: 800px;width:500px"  class="w3-hover-opacity">
               <div class="w3-container w3-white" style="length: 800px;width:500px">
               <h3 class= "w3-center"><b>${r[i].Band}</b></h3>
               <p class= "w3-center">${r[i].Album}</p>
               </div>
            </div>
          </div>
        </div>
      `;
    }

    html += `</div>`;

    this.render(`   
      ${html}
      `,document.getElementById('landingpage'));
  }
	
}

let component = new Component();
component.musicList();
component.musicCreate();
component.RecentActivity();
