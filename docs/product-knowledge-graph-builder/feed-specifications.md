---
title: Feed Specifications
displayed_sidebar: docs
sidebar_position: 100
---

# Feed Specifications

## Google Merchant-to-Schema.org mapping

The following table describes how Product KG Builder maps Google Merchant product data to Schema.org. The **Status** column reflects Product KG Builder's current mapping expectations. Because Google Merchant requirements can change, also consult Google's [product data specification](https://support.google.com/merchants/answer/7052112?hl=en).

You can transform the generated product graphs before they are written to the Graph store by using [webhooks](webhooks.md).

| Google Merchant Product Property | Status | Schema.org Property | Description |
|----------------------------------|----------|---------------------|-------------|
| offerId                          | required | sku                 | The product SKU |
| title                            | required | name                | The product name |
| description                      | required | description         | The product description; HTML is allowed |
| link                             | required | url                 | The product URL |
| imageLink                        | required | image               | The main product image URL |
| additionalImageLinks             | recommended | image              | Additional product image URLs |
| availability                     | required | availability        | Allowed values: InStock, LimitedAvailability, OnlineOnly, Discontinued, InStoreOnly, OutOfStock, SoldOut, PreOrder, PreSale, BackOrder |
| price_value                      | required | price               | The price without currency and thousands separator; use a period (.) to separate decimals |
| price_currency                   | required | priceCurrency       | The currency in 3-letter uppercase format |
| salePrice                        | optional | price, priceSpecification | The promotional price and currency; it becomes the offer price while the sale is active |
| salePriceEffectiveDate           | optional | validFrom, priceValidUntil | The ISO 8601 `start/end` interval in which the sale price is active |
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
| googleProductCategory            | optional  | category            | Google-defined product category represented as a Schema.org `CategoryCode` |
| itemGroupId                      | optional  | inProductGroupWithID | A parent SKU to group variant products |
| age_group                        | recommended | audience.suggestedMinAge, audience.suggestedMaxAge | The intended demographic age range |
| gender                           | recommended | audience.suggestedGender | The intended gender |
| color                            | recommended | color              | The product's color(s) |
| material                         | recommended | material           | The product's fabric or material |
| product_type                     | recommended | category            | The product category defined by you, represented as text |

## Google product category

When `googleProductCategory` is present and not blank, Product KG Builder adds a structured `CategoryCode` alongside the textual categories generated from `product_type`. The category value can be either a Google taxonomy ID or a `>`-separated taxonomy path.

```json
{
  "@type": "Product",
  "category": {
    "@type": "CategoryCode",
    "codeValue": "2271",
    "inCodeSet": "https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt"
  }
}
```

## Sale price validity

Product KG Builder applies `salePrice` according to `salePriceEffectiveDate`:

- During an active sale, including at either endpoint of the interval, the offer uses the sale price and includes `validFrom` and `priceValidUntil`. The regular price is also exposed as a `UnitPriceSpecification` with `priceType` set to `http://schema.org/StrikethroughPrice`.
- Before a sale starts or after it ends, the offer uses the regular price, omits sale-specific price specifications and `validFrom`, and keeps the existing end-of-year `priceValidUntil` value.
- If the interval is missing, blank, malformed, or has an end before its start, the sale price remains active for backward compatibility, without `validFrom` or a strikethrough price. `priceValidUntil` keeps the existing end-of-year value.

The interval accepts ISO 8601 date-times with an offset, date-times without an offset (interpreted as UTC), and plain dates. Plain start and end dates cover their complete respective days.

The following fragment represents a sale while the specified interval is active:

```json
{
  "@type": "Offer",
  "price": "79.00",
  "priceCurrency": "EUR",
  "validFrom": "2026-07-10T00:00+02:00",
  "priceValidUntil": "2026-07-20T23:59:59+02:00",
  "priceSpecification": [
    {
      "@type": "UnitPriceSpecification",
      "price": "99.00",
      "priceCurrency": "EUR",
      "priceType": "http://schema.org/ListPrice"
    },
    {
      "@type": "UnitPriceSpecification",
      "price": "79.00",
      "priceCurrency": "EUR"
    },
    {
      "@type": "UnitPriceSpecification",
      "price": "99.00",
      "priceCurrency": "EUR",
      "priceType": "http://schema.org/StrikethroughPrice"
    }
  ]
}
```
