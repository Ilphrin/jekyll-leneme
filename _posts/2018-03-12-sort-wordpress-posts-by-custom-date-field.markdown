---
layout: post
title: Sort Wordpress posts by a custom date field
author: kevin
categories: wordpress php
---

You may have already worked on a Wordpress theme, but you may have to create a 'custom field', an additional field that contains information related to an article, category, tag, or any other Wordpress entity. You can create different types of custom fields, and the one you'll be looking at today is Date, associated with an article.

And above all how to use it to sort our articles.

<!--break-->

## A Custom Date Field

A custom field is a metadata related to an article, page, etc. You can add as many metadata as you like, and these can contain a very wide range of information: A string of character, a number, a date, a time...

You can see the custom fields of an article by scrolling down the "Screen Options" menu at the top, then checking "Custom Fields". You can now see at the bottom of the article all the metadata of the article, and you can also add one.

![Wordpress theme options](/images/wordpress_01_en.jpg){:.img.cover}_Screen Options_

To simplify the article I used the [Advanced Custom Fields PRO](https://www.advancedcustomfields.com/) PRO plugin (Non-PRO version is just as good for our case). This plugin allows you to quickly create fields for each article without having to add the metadata key to each new article.

## The Use Case — Create a Theme

Here's the situation: You manage the creation of a Wordpress site for an organization X. X will frequently post articles about Meetup events that employees organize. These events all have a date on which they take place. The objective is therefore to have a Blog page that will list all the articles, and sort them not by date of writing of these articles, but by the date of the event to which each article corresponds.

For that we have to start from a new theme, because it will require to write some PHP code. I'm not going to go into the creation of a theme in detail, there is enough [literature](https://codex.wordpress.org/Theme_Development) [on](https://webdesign.tutsplus.com/tutorials/building-a-wordpress-theme-in-60-seconds--cms-24315) [the](https://colorlib.com/wp/how-to-create-unique-wordpress-themes-tutorials/) [subject](https://blog.templatetoaster.com/create-wordpress-theme-scratch/).

## WP_QUERY to make queries

If you have already created a theme in the past, or if you have just followed one of the links I just gave you, you normally have a theme folder with a `functions.php` file at the root. This file can contain a whole bunch of actions to save before loading a wordpress page, add CSS or JavaScript to load into your site or, in our case, modify a request to the content of a database on our site.

Wordpress has a very powerful object that handles all queries, called [WP_QUERY](https://codex.wordpress.org/Class_Reference/WP_Query). By directly modifying this object, you will be able to modify the way Wordpress requests to retrieve your articles.

You have your articles, they are beautiful, well written, and make you want to go to these events. You have even taken the time to add a custom field that contains the date of your event for each article. This field has the key:"date_event". We are now going to add an [action](https://codex.wordpress.org/Plugin_API/Action_Reference) that will be executed just before retrieving the items:

```
add_action( 'pre_get_posts', 'get_post_by_event'  );
function get_post_by_event( $query  ) {
  if( $query->is_main_query() && !is_admin() && is_home()  ) {
    $query->set( 'meta_key', 'date_event'  );
    $query->set( 'orderby', 'meta_value'  );
    $query->set( 'order', 'ASC'  );
  }
}
```

Let's just step by step see what this code does:

1. First of all we record the action, which is called `pre_get_posts`, and we ask it to launch `get_post_by_event` at the right time.
2. The `get_post_by_event` function takes a `$query` parameter that is an instance of class WP_QUERY. This parameter will be used to sort the articles.
3. This condition makes it possible to verify that we process the right request, but also to check which page we are on. These functions are internal to Wordpress.
4. We use 3 times the `$query->set` method to modify the query. The first one determines a metadata key for the query, here 'date_event'. The second time we change the order in which the articles will be returned, by `meta_value`, i. e. according to the value of the key of each article.

And finally we change the order so that we have events from the most recent to the most distant, but this is not obligatory.

## WP_QUERY and actions

WP_QUERY is a rather complex object to master (I don't pretend to master it completely!), but once you put your hands in it, you realize the many possibilities it offers. To the best of my knowledge, it's as customizable as if you could write the SQL query directly to retrieve the articles.

By combining this object with the actions of Wordpress, the possibilities become really numerous, and I can only invite you to read the documentation of the list of possible actions to give you an idea!
