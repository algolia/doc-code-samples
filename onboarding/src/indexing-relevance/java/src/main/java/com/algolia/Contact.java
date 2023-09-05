package com.algolia;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Contact {
  private String name;
  private String account;
  private Integer amount;
  private String id;
  private String closeDate;
  private String stageName;
  private String email;
  private String website;
  private String owner;



  public String getName() {
    return name;
  }

  public Contact setName(String name) {
    this.name = name;
    return this;
  }

  public String getAccount() {
    return account;
  }

  public Contact setAccount(String account) {
    this.account = account;
    return this;
  }

  public Integer getAmount() {
    return amount;
  }

  public Contact setAmount(Integer amount) {
    this.amount = amount;
    return this;
  }

  public String getCloseDate() {
    return closeDate;
  }

  public Contact setCloseDate(String closeDate) {
    this.closeDate = closeDate;
    return this;
  }

  public String getStageName() {
    return stageName;
  }

  public Contact setStageName(String stageName) {
    this.stageName = stageName;
    return this;
  }

  public String getType() {
    return type;
  }

  public Contact setType(String type) {
    this.type = type;
    return this;
  }

  public String getEmail() {
    return email;
  }

  public Contact setEmail(String Email) {
    this.email = email;
    return this;
  }

  public String getWebsite() {
    return website;
  }

  public Contact setWebsite(String website) {
    this.website = website;
    return this;
  }

  public String getOwner() {
    return owner;
  }

  public Contact setOwner(String owner) {
    this.owner = name;
    return this;
  }
}
