package com.algolia;

import java.util.Map;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Post {
"post_id": 7448,
"post_title": "Algolia + SeaUrchin.IO",
"post_date": 1521007207,
"post_date_formatted": "Mar 14th 2018",
"author_name": "Nicolas Dessaigne",
"author_image_url": "https://secure.gravatar.com/avatar/785489bc2ac2e08ae66648a8936c1101?s=40&d=mm&r=g",
"permalink": "https://blog.algolia.com/algolia-acquires-seaurchin-io/",
"categories": [
"News"
],
"image": "https://blog.algolia.com/wp-content/uploads/2018/03/2018-03_SeaUrchin-01-360x200.png",
"time_to_read": 2,
"content": "Building our Next Wave of Analytics \nWe’re introducing an exciting addition to our product family and rolling out new analytics solutions for our customers \nI’m thrilled to announce today our first acquisition: SeaUrchin.IO — a real-time analytics platform that zeroes in on search insights. This is a key milestone on our path to help our customers improve their user engagement. We’ve been focused on identifying new opportunities for them to create more intuitive, relevant and rewarding experiences. Today’s announcements bring us one step closer on that journey.\nWhy SeaUrchin.IO?\nWe first came across the SeaUrchin.IO team as admirers of their technology. They built a unique platform that surfaced granular insights about how users were engaging with search. They were targeting the exact need we were trying to solve for our customers. We quickly saw that together, we could accomplish so much more for our customers… and accomplish it faster!\nThanks to the work we’ve already been doing to integrate SeaUrchin’s technology, the acquisition has enabled us to immediately accelerate the development of our analytics solutions. Read more about our new Analytics here.\nWe’re just getting started\nWe’ve had a quite a year of milestones — we crossed the 40 billion mark for search queries processed monthly, doubled our revenue, team and customers. But as excited as I am about what the team has accomplished, I’m even more excited about the future. Bringing new technology to our team gives us the ability to innovate faster and bring new solutions to our community.\nWe’re on a mission to give product builders the tools to create amazing experiences, so stay tuned for what’s next!",
"record_index": 0
  private Integer postId;
  private String postTitle;
  private Integer postDate;
  private String postDateFormatted;
  private String authorName;
  private String authorImageUrl;
  private String permalink;
  private List<String> categories;
  private String image;
  private Integer timeToRead;
  private String content;
  private Integer recordIndex;

  public Integer getPostId() {
    return postId;
  }

  public Post setPostId(Integer postId) {
    this.postId = postId;
    return this;
  }

  public String getPostTitle() {
    return postTitle;
  }

  public Post setPostTitle(String postTitle) {
    this.postTitle = postTitle;
    return this;
  }

  public Integer getPostDate() {
    return postDate;
  }

  public Post setPostDate(Integer postDate) {
    this.postDate = postDate;
    return this;
  }

  public String getPostDateFormatted() {
    return postDateFormatted;
  }

  public Post setPostDateFormatted(String postDateFormatted) {
    this.postDateFormatted = postDateFormatted;
    return this;
  }

  public String getAuthorName() {
    return authorName;
  }

  public Post setAuthorName(String authorName) {
    this.authorName = authorName;
    return this;
  }

  public String getAuthorImageUrl() {
    return authorImageUrl;
  }

  public Post setAuthorImageUrl(String authorImageUrl) {
    this.authorImageUrl = authorImageUrl;
    return this;
  }

  public String getPermalink() {
    return permalink;
  }

  public Post setPermalink(String permalink) {
    this.permalink = permalink;
    return this;
  }

  public List<String> getCategories() {
    return categories;
  }

  public Post setCategories(List<String> categories) {
    this.categories = categories;
    return this;
  }

  public String getImage() {
    return image;
  }

  public Post setImage(String image) {
    this.image = image;
    return this;
  }

  public Integer getTimeToRead() {
    return timeToRead;
  }

  public Post setTimeToRead(Integer timeToRead) {
    this.timeToRead = timeToRead;
    return this;
  }

  public String getContent() {
    return content;
  }

  public Post setContent(String content) {
    this.content = content;
    return this;
  }

  public Integer getRecordIndex() {
    return recordIndex;
  }

  public Post setRecordIndex(Integer recordIndex) {
    this.recordIndex = recordIndex;
    return this;
  }
}

class Author {
  private String displayName;
  private String avatarURL;

  public String getDisplayName() {
    return displayName;
  }

  public Author setDisplayName(String displayName) {
    this.displayName = displayName;
    return this;
  }

  public String getAvatarURL() {
    return avatarURL;
  }

  public Author setAvatarURL(String avatarURL) {
    this.avatarURL = avatarURL;
    return this;
  }
}

