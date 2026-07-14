# Matching engine

Matching runs **inside `fleetflow-api`** (BullMQ worker + Redis). There is no separate matcher container.

| Item | Detail |
|------|--------|
| Queue | `dispatch-queue` |
| Processor | `fleetflow-api/src/orders/matching.processor.ts` |
| Radius | 10 km Haversine (`MATCH_RADIUS_KM`) |
| Eligibility | Driver `AVAILABLE` + matching `vehicle.type` |
| On success | Order `ASSIGNED`, driver `ON_TRIP` |
| On failure | Order `CANCELLED` |

For the video demo flow (web create → assign → Flutter pickup/deliver → web update), see [`fleetflow-docs/DEMO_E2E.md`](../../fleetflow-docs/DEMO_E2E.md).
