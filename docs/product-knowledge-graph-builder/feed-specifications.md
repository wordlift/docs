---
title: Feed Specifications
displayed_sidebar: product-knowledge-graph-builder
sidebar_position: 100
---

**Mapping Between Google Merchant Product Properties and Schema.org Properties**

Customers and integrators can further enhance the Product graphs by using [webhooks](webhooks.md).

| Google Merchant Product Property | Required | Schema.org Property | Description |
|----------------------------------|----------|---------------------|-------------|
| offerId                          | required | sku                 | The product SKU |
| title                            | required | name                | The product name |
| description                      | required | description         | The product description; HTML is allowed |
| link                             | required | url                 | The product URL |
| imageLink                        | required | image               | The main product image; must have a ratio of 1:1, 4:3, or 16:9 and be at least 1,600 pixels wide |
| additionalImageLinks             | recommended | image              | Other product images; provide at least three ratios: 1:1, 4:3, and 16:9 |
| availability                     | required | availability        | Allowed values: InStock, LimitedAvailability, OnlineOnly, Discontinued, InStoreOnly, OutOfStock, SoldOut, PreOrder, PreSale, BackOrder |
| price_value                      | required | price               | The price without currency and thousands separator; use a period (.) to separate decimals |
| price_currency                   | required | priceCurrency       | The currency in 3-letter uppercase format |
| brand                            | recommended | brand              | The brand name |
| canonicalLink                    | recommended | url                | The product's canonical page URL |
| gtin                             | recommended | gtin (or gtin8, gtin12, gtin13, gtin14) | The Global Trade Item Number |
| condition                        | recommended | itemCondition      | Allowed values: NewCondition, RefurbishedCondition, DamagedCondition, UsedCondition |
| shipping0_price_value            | recommended | shippingRate.value | The shipping price without currency and thousands separator; use a period (.) to separate decimals |
| shipping0_price_currency         | recommended | shippingRate.currency | The currency in 3-letter uppercase format |
| shipping0_country                | recommended | shippingDestination.addressCountry | 2-letter uppercase country code |
| shippingWeight_value             | recommended | weight.value       | The product weight |
| shippingWeight_unit              | recommended | weight.unitText    | The weight unit |
| id                               | optional  | -                   | The merchant ID, if available |
| source                           | optional  | -                   | The feed source |
| contentLanguage                  | optional  | -                   | The content language 2-letter lowercase code |
| targetCountry                    | optional  | -                   | The target country 2-letter uppercase code |
| feedLabel                        | optional  | -                   | The feed name |
| channel                          | optional  | -                   | The target channel |
| googleProductCategory            | optional  | -                   | Google-defined product category |
| itemGroupId                      | optional  | inProductGroupWithID | A parent SKU to group variant products |
| age_group                        | recommended | audience.suggestedMinAge, audience.suggestedMaxAge | The intended demographic age range |
| gender                           | recommended | audience.suggestedGender | The intended gender |
| color                            | recommended | color              | The product's color(s) |
| material                         | recommended | material           | The product's fabric or material |
| product_type                     | recommended | -                   | The product category defined by you |

**Recent Updates:**
- **Newly Added Properties:**
  - `additionalImageLinks` → `image` Additional images for the product, supports multiple image URLs
  - `canonicalLink` → `url` The canonical URL of the product, ensuring search engines reference the correct page
  - `itemGroupId` → `inProductGroupWithID` Used to group product variants under a common identifier
  - `age_group` → `audience.suggestedMinAge, audience.suggestedMaxAge` Defines the intended audience age range: `newborn` 0.0-0.25 years, `infant` 0.25-1.0 years, `toddler` 1.0-5.0 years, `kids` 5.0-13.0 years, `adult` 13.0+ years
  - `gender` → `audience.suggestedGender` Specifies the gender targeting: `Female`, `Male`, `Unisex`
  - `shipping0_price_value` → `shippingRate.value` Specifies the shipping cost, using a decimal format
  - `shipping0_price_currency` → `shippingRate.currency` The currency of the shipping cost in 3-letter uppercase format
  - `shipping0_country` → `shippingDestination.addressCountry` Indicates the shipping destination using a 2-letter country code
  - `color` → `color` Defines the color of the product as described by the merchant
  - `material` → `material` Indicates the fabric or material composition of the product
