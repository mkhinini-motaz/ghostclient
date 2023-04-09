export default class LoyaltyAction {
    id: number;
    type: number;
    points_rewarded: number;
    created_at: number;

    constructor(id: number, type: number, points_rewarded: number, created_at: number) {
        this.id = id;
        this.type = type;
        this.points_rewarded = points_rewarded;
        this.created_at = created_at;
    }
}
