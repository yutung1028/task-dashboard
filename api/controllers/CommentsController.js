/**
 * CommentsController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function(req,res) {
		var input = req.allParams();
		Comments.find({status_id: input.status_id, limit: 50 }).exec(function(err, result) {
			if (err) console.log(err);
			Pages.find({status_id: input.status_id, limit: 50 }).exec(function(err, pages_data) {
				console.log(pages_data[0].num_likes);
				return res.view('comments', {data: result, pages_result:pages_data});num_likes
			})
		})
	}, 
	search: function(req, res) {

		var input = req.allParams();
		console.log(input);

		Comments.find({
		  or : [ {
			  company : {
			    'contains' : input.keywords
			  }},
			  {topic : {
			    'contains' : input.keywords
			  }},
			  {status_message : {
			    'contains' : input.keywords
			  }},
			  {tags : {
			    'contains' : input.keywords
			  }},
			],
			status_type : {
			    'contains' : input.type
			  },
			created_dt: { '>': input.from, '<': input.to }
			,limit:100
		}).exec(function(err, result) {
			if (err) console.log(err);
			console.log(result);
			return res.view('search', {data: result});
		})
		
	},
};

