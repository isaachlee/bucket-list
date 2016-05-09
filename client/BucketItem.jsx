BucketItemReact = React.createClass({

	propTypes: {
		bucketitem: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			id: this.props.bucketitem._id,
			title: this.props.bucketitem.title,
			description: this.props.bucketitem.description,
			tags: this.props.bucketitem.tags,
			category: this.props.bucketitem.category,
			address: this.props.bucketitem.address,
			rating: this.props.bucketitem.rating,
			editing: false,
			image_id: this.props.bucketitem.image_id,
			username: this.props.bucketitem.username,
			showDescription: false,
			showAll: false
		};
	},

	toggleChecked() {
		BucketItemsCollection.update(this.props.bucketitem._id, {
			$set: {checked: ! this.props.bucketitem.checked}
		})
	},

	toggleShowAll(event) {
		this.setState({showAll: !this.state.showAll})
	},

	toggleDescription(event){
		this.setState({showDescription: !this.state.showDescription})
    this.toggleSelected();
	},

	showBucketItemDetails(){
		var currentItem = BucketItemsCollection.find(this.bucketitem._id)
	},

	showPictureID(){
		var currentPicture = BucketItemsCollection.find(this.bucketitem.image_id)
	},

	toggleSelected(){
    if ($("#"+this.props.bucketitem._id).hasClass("active")){
      $("#"+this.props.bucketitem._id).removeClass("active")
    } else {
      $("#"+this.props.bucketitem._id).addClass("active")
    }
	},

	returnUrl(){
		var prefix = "/cfs/files/images/"
		var token = "?token=eyJhdXRoVG9rZW4iOiJOTFBseGdpNWVBX0N6dUU1cGpLSHh6ZEdPM09kTzljakZEQndPNWY0QnpIIn0%3D"
		var id = this.state.image_id
		if (id == undefined){
			var url = ""
		} else {
			var url = prefix + id + token
		}
		return (url)
	},

	updateThisBucketItem(event) {
		event.preventDefault();
		var newtitle = this.state.title.trim();
		var newdescription = this.state.description.trim();
		var newtags = this.state.tags.trim();
		var newcategory = this.state.category.trim();
		var newaddress = this.state.address.trim();
		var newrating = this.state.rating.trim();
		var newpicture = this.state.image_id.trim();
		BucketItemsCollection.update(this.props.bucketitem._id, {$set : {
					title: newtitle,
					description: newdescription,
					tags: newtags,
					username: this.props.bucketitem.username,
					category: newcategory,
					image_id: newpicture,
					address: newaddress,
					rating: newrating,
				}
			}
		)
		this.setState({editing: false});
	},

	deleteThisBucketItem() {
		BucketItemsCollection.remove(this.props.bucketitem._id);
		Images.remove(this.state.bucketitem.image_id);
	},

	handleTitleChange(event){
		this.setState({title: event.target.value})
	},

	handleDescriptionChange(event){
		this.setState({description: event.target.value})
	},

	handleTagsChange(event){
		this.setState({tags: event.target.value})
	},

	handleCategoryChange(event){
		this.setState({category: event.target.value})
	},

	handleAddressChange(event){
		this.setState({address: event.target.value})
	},

	handleRatingChange(event){
		this.setState({rating: event.target.value})
	},

	handlePictureChange(event){
		this.setState({image_id: Session.get('photoID')})
	},

	openForm(event){
		this.setState({editing: true});
	  ReactDOM.render(<PhotoCapsule />, document.getElementById("render-photo"));
  },

	closeForm(event) {
		this.setState({editing: false});
    ReactDOM.unmountComponentAtNode(document.getElementById("render-photo"));
	},


	addToPersonalList() {
			// var currentTitle = this.state.title
			// var current_ID = this.state.id
			// var currentUser = Meteor.user()

			// var currentProfile = Meteor.user().profile
			// var usersItems = Meteor.user().profile.takenItems

		// console.log("currentProfile::")
		// console.log(currentProfile)

		// console.log("userItems::")
		// console.log(usersItems)


		// var finalItemsList = function(){
		// 	usersItems.push(currentTitle)
		// }

		// var itemToAdd = {currentTitle}
		// // console.log("itemToAdd::")
		// // console.log(itemToAdd)

		// finalItemsList();
		// console.log(currentUser)
		// var finalItems = finalItemsList
		// console.log("finalItemsList::")
		// console.log(itemToAdd)
		// var addedItemProfile = function() {
		// 	currentProfile.takenItems =
		// }


		// console.log(currentProfile)
		// 	var usersProfile = currentProfile
		// 	// allItems.push("test")
		// 	// currentProfile.takenItems = "test";
		// 	var allItems = currentProfile.takenItems
		// 	var finalItems = allItems.push("testing")
		// 	console.log(allItems)
			// var currentItemsTaken = Meteor.user().profile.takenItems
			// var addedOneItem = currentItemsTaken.push({name: "I hope this works"})
			// console.log("Profile Before Adding::")
			// console.log(Meteor.user().profile);
		// console.log(currentItemsTaken);
		// console.log(addedOneItem);

			// Meteor.users.update({_id: Meteor.user()._id},
			// 	{$set: {
			// 						takenItems:{ currentItemsTaken}
			// 					}
			// 				}
			// 				)
			// console.log("Profile After Adding::")
			// console.log(Meteor.user().profile);
	},

	render() {
		const itemClassName = this.props.bucketitem.checked ? "checked" : "";
		return (
			<li className="collection-item" id={this.props.bucketitem._id}>
        <div className="row">
          <div onClick={this.toggleDescription}>
          <button className="btn left purple">Select: {this.props.bucketitem.title}
            </button>
          </div>
          </div>
          <div className="row">

				<button className="delete right btn red" onClick={this.deleteThisBucketItem}>
					&times;
				</button>
				<div id="render-photo"></div>
				<div id="picture-target"></div>

				{this.state.editing == false
				?	<button className="button btn right" onClick={this.openForm}>Edit</button>

				:	<button className="stopediting btn right" onClick={this.closeForm}>Close Edit Form</button>
				}

        </div>

				{(this.state.showDescription == true)
				?
					<div>
						<button className="btn blue" onClick={this.toggleShowAll}>Show All Details</button>
						<ul>
							<li className="description">Description: {this.props.bucketitem.description}</li>
						</ul>
					</div>
				:null
				}

				{(this.state.showDescription == true && this.state.showAll == true)
					?
						<div>
							<ul>
								<li className="tags">{this.props.bucketitem.tags}</li>
								<li className="address">Address: {this.props.bucketitem.address}</li>
								<li><img className="picture" src={this.returnUrl()} /></li>
							</ul>
						</div>

					:	null

				}
				{(this.state.editing == true)
					? <form className="editform form-group" onSubmit={this.updateThisBucketItem}>
					<p> Title:
						<input
						className="form-control"

							type="text"
							name="updatedText"
							placeholder="Please don't leave blank"
							onChange={this.handleTitleChange}
							defaultValue={this.props.bucketitem.title} />
					</p>
	        <p>
	          Description:
            <input
            className="form-control"

              type="text"
              ref="description"
							onChange={this.handleDescriptionChange}
							defaultValue={this.props.bucketitem.description}
              placeholder="Define Description Here" />
          </p>
          <p>
          	Tags:
            <input
            className="form-control"

              type="text"
              ref="tags"
              onChange={this.handleTagsChange}
							defaultValue={this.props.bucketitem.tags}
              placeholder="Define tags here" />
          </p>
           <p>Category:
					   <select
						   ref="category"
               onChange={this.handleCategoryChange}
							 defaultValue={this.props.bucketitem.category}
						   className="drop-down-select"
						   id="category-drop-down-edit">
						     <option value="Education">Education</option>
						     <option value="Food">Food</option>
						     <option value="Local">Local</option>
						     <option value="Outdoors">Outdoors</option>
						     <option value="Sports">Sports</option>
						     <option value="Tourist">Tourist</option>
						     <option value="Travel">Travel</option>
						  </select>

          </p>
            <p>Address:
            <input
            className="form-control"

              type="text"
              ref="address"
              onChange={this.handleAddressChange}
							defaultValue={this.props.bucketitem.address}
              placeholder="Type Address Here" />
          </p>
            <p>Rating:
	            <select
						   ref="rating"
               onChange={this.handleRatingChange}
							 defaultValue={this.props.bucketitem.rating}
						   className="drop-down-select"
						   id="rating-select-edit">
						     <option value="1" >1</option>
						     <option value="2" >2</option>
						     <option value="3" >3</option>
						     <option value="4" >4</option>
						     <option value="5" >5</option>
						  </select>
          </p>

	        <p> Picture:
	        <img className="picture" src={this.returnUrl()} />
					</p>

						<input
						 className="button" type="submit" value="Update This Item"/>
					</form>
					: null
				}
			</li>
		);
	}
});
