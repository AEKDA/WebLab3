import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import java.util.Date;

import itmo.web.lab3.beans.Hit;
import itmo.web.lab3.services.HitService;

public class HitServiceTest {
    private HitService hitService;

    @Before
    public void setUp() {
        hitService = new HitService(false);
    }

    @Test
    public void testCheckHit() {
        assertTrue(hitService.checkHit(new Hit(0, 0, 1, true, new Date().getTime(), 12))); // точка (0,0) входит в круг
        assertTrue(hitService.checkHit(new Hit(1, 1, 1, true, new Date().getTime(), 12))); // точка (1,1) входит в
                                                                                           // квадрат
        assertFalse(hitService.checkHit(new Hit(-1, -1, 1, true, new Date().getTime(), 12))); // точка (-1,-1) входит в
                                                                                             // треугольник
        assertFalse(hitService.checkHit(new Hit(2, 2, 1, true, new Date().getTime(), 12))); // точка (2,2) не входит ни
                                                                                            // в одну область
    }
}
