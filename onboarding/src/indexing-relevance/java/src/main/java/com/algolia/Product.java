package com.algolia;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {
  private String name;
  private String description;
  private String brand;
  private List<String> categories;
  private Double price;
  private String image;
  private Integer popularity;

  public Product() {
  }

  public String getName() {
    return name;
  }

  public Product setName(String name) {
    this.name = name;
    return this;
  }

  public String getDescription() {
    return description;
  }

  public Product setDescription(String description) {
    this.description = description;
    return this;
  }

  public String getBrand() {
    return brand;
  }

  public Product setBrand(String brand) {
    this.brand = brand;
    return this;
  }

  public List<String> getCategories() {
    return categories;
  }

  public Product setCategories(List<String> categories) {
    this.categories = categories;
    return this;
  }

  public Double getPrice() {
    return price;
  }

  public Product setPrice(Double price) {
    this.price = price;
    return this;
  }

  public String getImage() {
    return image;
  }

  public Product setImage(String image) {
    this.image = image;
    return this;
  }

  public Integer getPopularity() {
    return popularity;
  }

  public Product setPopularity(Integer popularity) {
    this.popularity = popularity;
    return this;
  }
}
