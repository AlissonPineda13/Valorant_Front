import { WeaponModel } from "../components/models/weaponmodel";
import { WeaponDto } from "../models/weaponDto";

export class WeaponMapper {

    static fromApi(data: WeaponDto): WeaponModel {

        return {
            id: data.id,
            name: data.name,
            category: data.category,
            image: data.image,
            price: data.price,
            headDamage: data.head_damage,
            bodyDamage: data.body_damage,
            legDamage: data.leg_damage
        };
    }

    static fromApiList(data: WeaponDto[]): WeaponModel[] {

        return data.map(weapon =>
            WeaponMapper.fromApi(weapon)
        );
    }
}