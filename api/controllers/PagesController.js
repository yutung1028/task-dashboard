/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function(req,res) {
		Pages.find({limit: 50 }).exec(function(err, result) {
			if (err) console.log(err);
			return res.view('search', {data: result});
		})
	}, 
	search: function(req, res) {

		var input = req.allParams();
		var page_list;
		console.log(input);

		Pages.find({
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
			  }
			,limit:100
		}).exec(function(err, result) {
			if (err) console.log(err);
			console.log(result);
			return res.view('search', {data: result});
		})
		
	},
};

