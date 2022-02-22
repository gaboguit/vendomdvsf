import { JsonApiDocument } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import {Shipment, ShipmentLineItem, ShippingRate} from '../..';
import {extractRelationships, filterAttachments} from './common';

export const deserializeShippingRate = (method): ShippingRate => ({
  id: method.id,
  methodId: method.attributes.shipping_method_id,
  name: method.attributes.name,
  selected: method.attributes.selected,
  cost: method.attributes.cost
});
export const deserializeLineItem = (item): ShipmentLineItem => ({
  id: item.id,
  name: item.attributes.name,
  quantity: item.attributes.quantity,
  total: item.attributes.total
});

export const deserializeShipment = (shipment, included: JsonApiDocument[]): Shipment => {
  const shippingRates = extractRelationships(included, 'shipping_rate', 'shipping_rates', shipment);
  const lineItems = extractRelationships(included, 'line_item', 'line_items', shipment);
  const stockLocactionId = shipment.relationships.stock_location.data.id;
  const stockLocationName = filterAttachments(included, 'stock_location', [stockLocactionId])[0].attributes.name;
  return {
    id: shipment.id,
    stockLocationName,
    lineItems: lineItems.map(deserializeLineItem),
    availableShippingRates: shippingRates.map(deserializeShippingRate)
  };
};

export const deserializeCartShipments = (included: JsonApiDocument[]): Shipment[] => {
  const shipments = included.filter(e => e.type === 'shipment');
  return shipments.map(e => deserializeShipment(e, included));
};
